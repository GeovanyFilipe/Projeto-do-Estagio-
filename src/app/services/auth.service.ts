import { Injectable, inject, Injector, runInInjectionContext, NgZone } from '@angular/core';
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
  createUser,
  logLogin,
  logLogout,
  createSubscription,
  listSubscriptionTypes,
  getUserSubscription
} from '@dataconnect/generated';
import { environment } from '../../environments/environment';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';


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
  private injector: Injector = inject(Injector);
  private ngZone: NgZone = inject(NgZone);

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

          // Verifica subscrição no Firebase Real em background
          this.getSubscriptionData(fbUser.uid).catch(() => { });
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

    // 2. Log login no Data Connect
    this.logSession(fbUser.uid).catch(() => { });

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

    // Sincroniza com a nuvem em background
    this.syncWithCloud(fbUser).catch(() => { });

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

    // Guarda no Data Connect
    await this.registerUser(user).catch(() => { });

    return user;
  }


  // ─── Logout ────────────────────────────────────────────────────────────────

  async logout(): Promise<void> {
    if (this.currentSessionId) {
      const sessionId = this.currentSessionId;
      this.currentSessionId = null;
      
      await new Promise<void>((resolve) => {
        this.ngZone.runOutsideAngular(() => {
          const dc = getDataConnect(connectorConfig);
          logLogout(dc, {
            sessionId: sessionId,
            logoutTime: new Date().toISOString()
          }).then(() => resolve()).catch(() => resolve());
        });
      });
    }

    await signOut(this.auth);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /** Obtém o token JWT do utilizador atual para chamadas seguras ao backend */
  async getIdToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
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

    // Persiste no Data Connect em background (fora do zone para evitar erros circulares)
    try {
      await new Promise<void>((resolve, reject) => {
        this.ngZone.runOutsideAngular(async () => {
          try {
            const dc = getDataConnect(connectorConfig);
            const types = await listSubscriptionTypes(dc);
            const type = types.data.subscriptionTypes.find(t => t.name.toLowerCase() === novoPlano.toLowerCase());

            if (type) {
              await createSubscription(dc, {
                userId: user.id,
                typeId: type.id,
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
              });
            }
            resolve();
          } catch (e) { reject(e); }
        });
      });
    } catch (err) {
      console.error('Erro ao atualizar plano no Data Connect:', err);
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

  /** Sincroniza utilizador do Google com a Cloud */
  private async syncWithCloud(fbUser: FirebaseUser): Promise<void> {
    try {
      await this.registerUser(this.fbUserToUser(fbUser));
    } catch (err) { }
    await this.getSubscriptionData(fbUser.uid);
  }

  /** Procura dados de subscrição na Cloud e atualiza o estado */
  private async getSubscriptionData(uid: string): Promise<void> {
    if (!uid) return;

    try {
      const res = await new Promise<any>((resolve, reject) => {
        this.ngZone.runOutsideAngular(() => {
          const dc = getDataConnect(connectorConfig);
          getUserSubscription(dc, { userId: uid }).then(resolve).catch(reject);
        });
      });
      
      if (res?.data?.userSubscriptions) {
        const activeSub = res.data.userSubscriptions.find((s: any) => s.subscriptionType);
        if (activeSub) {
          const user = this.currentUserSubject.value;
          if (user) {
            this.currentUserSubject.next({
              ...user,
              plano: activeSub.subscriptionType.name || 'Nenhum plano'
            });
          }
        }
      }
    } catch (err: any) {
      // Log seguro apenas em desenvolvimento
      if (!environment.production) {
        const errorMsg = err?.message ? String(err.message) : String(err);
        console.warn('[Firebase] Erro de subscrição:', errorMsg);
      }
    }
  }

  /** Regista a sessão no Data Connect */
  private async logSession(uid: string): Promise<void> {
    try {
      this.currentSessionId = crypto.randomUUID();
      const sessionId = this.currentSessionId;
      
      this.ngZone.runOutsideAngular(() => {
        const dc = getDataConnect(connectorConfig);
        logLogin(dc, {
          id: sessionId,
          userId: uid,
          loginTime: new Date().toISOString(),
          ipAddress: '127.0.0.1',
          userAgent: navigator.userAgent
        }).catch((err) => {
          if (!environment.production) {
            console.warn('[Firebase] Erro ao registar sessão:', err?.message || String(err));
          }
        });
      });
    } catch (err: any) {
      // Ignora erro silenciando o log principal
    }
  }

  async registerUser(user: User): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.ngZone.runOutsideAngular(() => {
          const dc = getDataConnect(connectorConfig);
          createUser(dc, {
            id: user.id,
            email: user.email,
            passwordHash: 'GOOGLE_OR_EXTERNAL_AUTH',
            firstName: user.nome,
            createdAt: new Date().toISOString()
          }).then(() => resolve()).catch(reject);
        });
      });
    } catch (err) {
      throw err;
    }
  }
}
