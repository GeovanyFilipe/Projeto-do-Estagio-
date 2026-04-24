import { Injectable, inject, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  User as FirebaseUser
} from '@angular/fire/auth';

// Data Connect — as queries e mutações que já existem no projeto
import {
  createUser,
  getUser,
  getUserSubscription
} from '@dataconnect/generated';

// ─── Modelo de Utilizador da Aplicação ───────────────────────────────────────
export interface AppUser {
  uid: string;
  nome: string;
  email: string;
  plano: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  avatar: string;
  provider: 'email' | 'google' | 'mixed';
}

// ─── Tipos de Erro Personalizados ─────────────────────────────────────────────
export class AuthError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  // ── Dependências ─────────────────────────────────────────────────────────────
  private auth   = inject(Auth);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  // ── Estado Reativo ────────────────────────────────────────────────────────────
  private _user$        = new BehaviorSubject<AppUser | null>(null);
  private _initialized$ = new BehaviorSubject<boolean>(false);
  private _loading$     = new BehaviorSubject<boolean>(false);
  private _isAuth$      = new BehaviorSubject<boolean>(false);

  public readonly user$            = this._user$.asObservable();
  public readonly initialized$     = this._initialized$.asObservable();
  public readonly loading$         = this._loading$.asObservable();
  public readonly isAuthenticated$ = this._isAuth$.asObservable();

  constructor() {
    // Observer principal — reage a qualquer mudança de estado do Firebase Auth
    authState(this.auth).subscribe(fbUser => {
      if (fbUser) {
        // 1. Mostra o utilizador IMEDIATAMENTE (dados básicos do Firebase Auth)
        const quickUser = this._quickUser(fbUser);
        this.ngZone.run(() => {
          this._user$.next(quickUser);
          this._isAuth$.next(true);
          this._initialized$.next(true); // A app pode avançar já
        });

        // 2. Carrega dados extra do Data Connect em background (sem bloquear)
        this._enrichFromDataConnect(fbUser).then(enrichedUser => {
          this.ngZone.run(() => this._user$.next(enrichedUser));
        }).catch(() => {
          // Se o Data Connect falhar, o utilizador continua com os dados básicos
        });

      } else {
        this.ngZone.run(() => {
          this._user$.next(null);
          this._isAuth$.next(false);
          this._initialized$.next(true);
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // REGISTO COM EMAIL E PALAVRA-PASSE
  // ═══════════════════════════════════════════════════════════════════════════
  async signUp(email: string, password: string, nome: string): Promise<AppUser> {
    this._loading$.next(true);
    try {
      // 1. Criar conta no Firebase Auth
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      const fbUser = credential.user;

      // 2. Criar perfil no Data Connect (não bloqueia se falhar)
      const names = nome.trim().split(' ');
      createUser({
        id: fbUser.uid,
        email: email,
        firstName: names[0],
        lastName: names.slice(1).join(' ') || '',
        passwordHash: '',
        createdAt: new Date().toISOString()
      }).catch(e => console.warn('[AuthService] Perfil DC falhou:', e.message));

      // 3. Autenticar imediatamente
      const appUser: AppUser = {
        uid: fbUser.uid,
        nome: nome,
        email: email,
        plano: 'Nenhum plano',
        status: 'Inativo',
        avatar: fbUser.photoURL ?? 'assets/default-avatar.png',
        provider: 'email'
      };
      this._user$.next(appUser);
      this._isAuth$.next(true);
      return appUser;

    } catch (error: any) {
      throw this._mapFirebaseError(error);
    } finally {
      this._loading$.next(false);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN COM EMAIL E PALAVRA-PASSE
  // ═══════════════════════════════════════════════════════════════════════════
  async signIn(email: string, password: string): Promise<AppUser> {
    this._loading$.next(true);
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      const fbUser = credential.user;

      // Retornar utilizador imediatamente (o observer vai enriquecer depois)
      const appUser = this._quickUser(fbUser);
      this._user$.next(appUser);
      this._isAuth$.next(true);
      return appUser;

    } catch (error: any) {
      throw this._mapFirebaseError(error);
    } finally {
      this._loading$.next(false);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN COM GOOGLE
  // ═══════════════════════════════════════════════════════════════════════════
  async signInWithGoogle(): Promise<AppUser> {
    this._loading$.next(true);
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);
      const fbUser = credential.user;

      // Criar perfil no Data Connect se for a primeira vez (não bloqueia)
      const names = (fbUser.displayName ?? '').split(' ');
      createUser({
        id: fbUser.uid,
        email: fbUser.email ?? '',
        firstName: names[0] || 'Utilizador',
        lastName: names.slice(1).join(' ') || '',
        passwordHash: '',
        createdAt: new Date().toISOString()
      }).catch(() => {
        // Ignora se já existir
      });

      const appUser = this._quickUser(fbUser);
      appUser.provider = 'google';
      this._user$.next(appUser);
      this._isAuth$.next(true);
      return appUser;

    } catch (error: any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        throw new AuthError(
          'auth/account-exists-with-different-credential',
          'Este email já está registado com email e palavra-passe. Entra com email e palavra-passe.'
        );
      }
      throw this._mapFirebaseError(error);
    } finally {
      this._loading$.next(false);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RECUPERAÇÃO DE PALAVRA-PASSE
  // ═══════════════════════════════════════════════════════════════════════════
  async resetPassword(email: string): Promise<void> {
    this._loading$.next(true);
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      throw this._mapFirebaseError(error);
    } finally {
      this._loading$.next(false);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGOUT
  // ═══════════════════════════════════════════════════════════════════════════
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.ngZone.run(() => {
      this._user$.next(null);
      this._isAuth$.next(false);
      this.router.navigate(['/login']);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPERS PÚBLICOS
  // ═══════════════════════════════════════════════════════════════════════════
  isAuthenticated(): boolean {
    return this._isAuth$.value;
  }

  getCurrentUser(): AppUser | null {
    return this._user$.value;
  }

  async getIdToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }

  updatePlanLocally(plano: string): void {
    const user = this._user$.value;
    if (user) {
      this._user$.next({ ...user, plano, status: 'Ativo' });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MÉTODOS PRIVADOS
  // ═══════════════════════════════════════════════════════════════════════════

  // Perfil instantâneo a partir do Firebase Auth (sem rede)
  private _quickUser(fbUser: FirebaseUser): AppUser {
    const email = fbUser.email ?? '';
    return {
      uid: fbUser.uid,
      nome: fbUser.displayName ?? email.split('@')[0],
      email,
      plano: 'Nenhum plano',
      status: 'Inativo',
      avatar: fbUser.photoURL ?? 'assets/default-avatar.png',
      provider: 'email'
    };
  }

  // Enriquece o perfil com dados do Data Connect (plano, nome da DB, etc.)
  private async _enrichFromDataConnect(fbUser: FirebaseUser): Promise<AppUser> {
    const base = this._quickUser(fbUser);

    try {
      const [profileRes, subRes] = await Promise.all([
        getUser({ id: fbUser.uid }).catch(() => null),
        getUserSubscription({ userId: fbUser.uid }).catch(() => null)
      ]);

      if (profileRes?.data?.user?.firstName) {
        base.nome = profileRes.data.user.firstName;
      }

      const activeSub = (subRes?.data as any)?.userSubscriptions?.[0];
      if (activeSub?.subscriptionType?.name) {
        base.plano = activeSub.subscriptionType.name;
        base.status = 'Ativo';
      }
    } catch (err) {
      // Silencioso — dados básicos já estão disponíveis
    }

    return base;
  }

  // Mapeia erros do Firebase para mensagens amigáveis em PT
  private _mapFirebaseError(error: any): AuthError {
    if (error instanceof AuthError) return error;

    const messages: Record<string, string> = {
      'auth/invalid-email':              'O formato do email é inválido.',
      'auth/user-not-found':             'Não existe nenhuma conta com este email.',
      'auth/wrong-password':             'Palavra-passe incorreta.',
      'auth/invalid-credential':         'Email ou palavra-passe incorretos.',
      'auth/email-already-in-use':       'Este email já está em uso.',
      'auth/weak-password':              'A palavra-passe deve ter pelo menos 6 caracteres.',
      'auth/popup-closed-by-user':       'O popup foi fechado antes de concluir o login.',
      'auth/popup-blocked':              'O navegador bloqueou o popup. Permite popups para este site.',
      'auth/network-request-failed':     'Sem ligação à internet. Verifica a tua rede.',
      'auth/too-many-requests':          'Demasiadas tentativas. Aguarda alguns minutos.',
      'auth/operation-not-allowed':      'Este método de login não está ativo.',
      'auth/account-exists-with-different-credential': 'Este email está associado a outro método de login.',
    };

    const message = messages[error.code] ?? error.message ?? 'Ocorreu um erro inesperado.';
    return new AuthError(error.code ?? 'auth/unknown', message);
  }
}