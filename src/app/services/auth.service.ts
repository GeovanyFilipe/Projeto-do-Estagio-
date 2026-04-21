import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from '@angular/fire/auth';
import {
  DataConnect
} from 'firebase/data-connect';
import {
  createUser,
  logLogin,
  logLogout,
  createSubscription,
  listSubscriptionTypes,
  getUserSubscription
} from '@dataconnect/generated';


export interface User {
  id: string;
  email: string;
  nome: string;
  plano: string;
  dataCadastro: string;
  ativo: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
  success: boolean;
}

// Data Connect não precisa de timeout manual como o Firestore offline

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private dataconnect: DataConnect = inject(DataConnect);
  private injector: Injector = inject(Injector);

  private currentSessionId: string | null = null;


  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  /** Emite true depois do Firebase ter resolvido o estado inicial (1ª emissão do authState) */
  private initializedSubject = new BehaviorSubject<boolean>(false);
  public initialized$ = this.initializedSubject.asObservable();

  constructor() {
    // Observa mudanças de estado do Firebase Auth (ex: reload da página)
    authState(this.auth).subscribe(fbUser => {
      if (fbUser) {
        // Se já temos o utilizador em memória, não consulta redundante
        if (!this.currentUserSubject.value) {
          const basicUser = this.fbUserToUser(fbUser);
          this.currentUserSubject.next(basicUser);
          this.isAuthenticatedSubject.next(true);

          // Enriquece com dados do PGLite em background
          this.enrichUserFromPGLite(fbUser.uid).catch(() => { });
        }  
      } else {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
      }

      // Marca como inicializado após a primeira emissão do Firebase (seja user ou null)
      if (!this.initializedSubject.value) {
        this.initializedSubject.next(true);
      }
    });
  }

  // ─── Login com email/password ──────────────────────────────────────────────

  async login(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const fbUser = credential.user;

    // 1. Define logo o utilizador com dados básicos do Auth
    const basicUser = this.fbUserToUser(fbUser, email);
    this.currentUserSubject.next(basicUser);
    this.isAuthenticatedSubject.next(true);

    // 2. Log login no PGLite
    this.logSessionToPGLite(fbUser.uid).catch(() => { });

    return basicUser;
  }


  // ─── Login com Google ──────────────────────────────────────────────────────

  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    const fbUser = credential.user;

    const basicUser = this.fbUserToUser(fbUser);
    this.currentUserSubject.next(basicUser);
    this.isAuthenticatedSubject.next(true);

    // Tenta sincronizar com PGLite em background
    this.syncGoogleUserToPGLite(fbUser).catch(() => { });

    return basicUser;
  }

  // ─── Registo ───────────────────────────────────────────────────────────────

  async register(email: string, password: string, nome: string, plano: string): Promise<User> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user: User = {
      id: credential.user.uid,
      email,
      nome,
      plano: plano || 'Nenhum plano',
      dataCadastro: credential.user.metadata?.creationTime || new Date().toISOString(),
      ativo: true
    };

    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);

    // Guarda no PGLite
    await this.registerUserInPGLite(user).catch(() => { });

    return user;
  }


  // ─── Logout ────────────────────────────────────────────────────────────────

  async logout(): Promise<void> {
    if (this.currentSessionId) {
      await logLogout(this.dataconnect, {
        sessionId: this.currentSessionId,
        logoutTime: new Date().toISOString()
      }).catch(() => { });
      this.currentSessionId = null;
    }

    await signOut(this.auth);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }


  // ─── Getters síncronos ─────────────────────────────────────────────────────

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // ─── Atualizar plano ───────────────────────────────────────────────────────

  async updatePlano(novoPlano: string): Promise<void> {
    const user = this.currentUserSubject.value;
    if (!user) return;

    // Atualiza em memória imediatamente
    this.currentUserSubject.next({ ...user, plano: novoPlano });

    // Persiste no PGLite em background
    try {
      // Procura o ID do tipo de assinatura
      const types = await listSubscriptionTypes(this.dataconnect);
      const type = types.data.subscriptionTypes.find(t => t.name.toLowerCase() === novoPlano.toLowerCase());

      if (type) {
        await createSubscription(this.dataconnect, {
          userId: user.id,
          typeId: type.id,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // +30 dias
        });
      }
    } catch (err) {
      console.error('Erro ao atualizar plano no PGLite:', err);
    }
  }


  // ─── Métodos privados ──────────────────────────────────────────────────────

  /** Converte FirebaseUser num User da aplicação (dados básicos, sem Firestore) */
  private fbUserToUser(fbUser: FirebaseUser, emailFallback?: string): User {
    return {
      id: fbUser.uid,
      email: fbUser.email || emailFallback || '',
      nome: fbUser.displayName || (fbUser.email || emailFallback || '').split('@')[0],
      plano: 'Nenhum plano',
      // metadata.creationTime vem do Firebase Auth e reflete a data real de criação da conta
      // nunca é alterado a cada login — ao contrário de new Date()
      dataCadastro: fbUser.metadata?.creationTime || new Date().toISOString(),
      ativo: true
    };
  }

  /** Sincroniza utilizador do Google com o PGLite */
  private async syncGoogleUserToPGLite(fbUser: FirebaseUser): Promise<void> {
    try {
      // Tenta criar (vai falhar se já existir, e tudo bem)
      await this.registerUserInPGLite(this.fbUserToUser(fbUser));
    } catch (err) {
      // Se falhar (ex: User já existe), enriquecemos os dados existentes
    }
    await this.enrichUserFromPGLite(fbUser.uid);
  }

  /** Procura dados extra no PGLite (ex: Plano) e atualiza o estado */
  private async enrichUserFromPGLite(uid: string): Promise<void> {
    try {
      // Usamos getUserSubscription que já está no SDK
      const res = await getUserSubscription(this.dataconnect, { userId: uid });
      const activeSub = res.data.userSubscriptions?.find((s: any) => s.subscriptionType);

      if (activeSub) {
        const user = this.currentUserSubject.value;
        if (user) {
          this.currentUserSubject.next({
            ...user,
            plano: activeSub.subscriptionType.name || 'Nenhum plano'
          });
        }
      }
    } catch (err) {
      console.error('Erro ao enriquecer dados do PGLite:', err);
    }
  }

  /** Regista a sessão no PGLite */
  private async logSessionToPGLite(uid: string): Promise<void> {
    try {
      this.currentSessionId = crypto.randomUUID();
      await logLogin(this.dataconnect, {
        id: this.currentSessionId,
        userId: uid,
        loginTime: new Date().toISOString(),
        ipAddress: '127.0.0.1', // Em produção viria do servidor
        userAgent: navigator.userAgent
      });
    } catch (err) {
      console.error('Erro ao registar sessão no PGLite:', err);
    }
  }

  /** Guarda dados do utilizador no PGLite */
  async registerUserInPGLite(user: User): Promise<void> {
    try {
      await createUser(this.dataconnect, {
        id: user.id,
        email: user.email,
        passwordHash: 'GOOGLE_OR_EXTERNAL_AUTH',
        firstName: user.nome,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      // Relança para o chamador decidir se é grave (ex: duplicação)
      throw err;
    }
  }
}

