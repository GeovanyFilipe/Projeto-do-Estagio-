import { Injectable, inject, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from '@angular/fire/firestore';

// ─── Modelo de Utilizador da Aplicação ───────────────────────────────────────
export interface AppUser {
  uid: string;
  nome: string;
  email: string;
  plano: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  emailVerified: boolean;
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
  private auth     = inject(Auth);
  private firestore = inject(Firestore);
  private router   = inject(Router);
  private ngZone   = inject(NgZone);

  // ── Estado Reativo ────────────────────────────────────────────────────────────
  private _user$          = new BehaviorSubject<AppUser | null>(null);
  private _initialized$   = new BehaviorSubject<boolean>(false);
  private _loading$       = new BehaviorSubject<boolean>(false);

  public readonly user$         = this._user$.asObservable();
  public readonly initialized$  = this._initialized$.asObservable();
  public readonly loading$      = this._loading$.asObservable();
  public readonly isAuthenticated$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    // Observer principal — reage a qualquer mudança de estado do Firebase Auth
    authState(this.auth).subscribe(async fbUser => {
      if (fbUser) {
        // Mostra estado temporário imediatamente (sem bloquear a UI)
        this.ngZone.run(() => {
          (this.isAuthenticated$ as BehaviorSubject<boolean>).next(true);
        });

        // Carrega perfil completo do Firestore
        const appUser = await this._buildAppUser(fbUser);
        this.ngZone.run(() => {
          this._user$.next(appUser);
          (this.isAuthenticated$ as BehaviorSubject<boolean>).next(true);
          this._initialized$.next(true);
        });
      } else {
        this.ngZone.run(() => {
          this._user$.next(null);
          (this.isAuthenticated$ as BehaviorSubject<boolean>).next(false);
          this._initialized$.next(true);
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // REGISTO COM EMAIL E PALAVRA-PASSE
  // ═══════════════════════════════════════════════════════════════════════════
  async signUp(email: string, password: string, nome: string): Promise<void> {
    this._loading$.next(true);
    try {
      // 1. Verificar se o email já está em uso (por qualquer método)
      await this._checkEmailAvailability(email);

      // 2. Criar conta no Firebase Auth
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      const fbUser = credential.user;

      // 3. Enviar email de verificação (obrigatório)
      await sendEmailVerification(fbUser);

      // 4. Criar perfil no Firestore (não bloqueia se falhar)
      this._createFirestoreProfile(fbUser, nome, 'email').catch(e =>
        console.warn('[AuthService] Perfil Firestore falhou (não crítico):', e.message)
      );

      // 5. Fazer logout — utilizador deve verificar email primeiro
      await signOut(this.auth);

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

      // Bloquear se o email não foi verificado
      if (!fbUser.emailVerified) {
        await signOut(this.auth);
        throw new AuthError(
          'auth/email-not-verified',
          'Por favor verifica o teu email antes de entrar. Verifica a tua caixa de entrada.'
        );
      }

      const appUser = await this._buildAppUser(fbUser);
      this._user$.next(appUser);
      (this.isAuthenticated$ as BehaviorSubject<boolean>).next(true);
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

      // Criar perfil no Firestore se não existir
      await this._ensureFirestoreProfile(fbUser, 'google');

      const appUser = await this._buildAppUser(fbUser);
      this._user$.next(appUser);
      (this.isAuthenticated$ as BehaviorSubject<boolean>).next(true);
      return appUser;

    } catch (error: any) {
      // Caso especial: email já existe com outro método (ex: email/password)
      if (error.code === 'auth/account-exists-with-different-credential') {
        throw new AuthError(
          'auth/account-exists-with-different-credential',
          'Este email já está registado com email e palavra-passe. Por favor, entre com email e palavra-passe.'
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
      (this.isAuthenticated$ as BehaviorSubject<boolean>).next(false);
      this.router.navigate(['/login']);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // REENVIAR EMAIL DE VERIFICAÇÃO
  // ═══════════════════════════════════════════════════════════════════════════
  async resendVerificationEmail(): Promise<void> {
    const fbUser = this.auth.currentUser;
    if (fbUser && !fbUser.emailVerified) {
      await sendEmailVerification(fbUser);
    } else {
      throw new AuthError('auth/already-verified', 'Este email já foi verificado.');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPERS PÚBLICOS
  // ═══════════════════════════════════════════════════════════════════════════
  isAuthenticated(): boolean {
    return (this.isAuthenticated$ as BehaviorSubject<boolean>).value;
  }

  getCurrentUser(): AppUser | null {
    return this._user$.value;
  }

  async getIdToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }

  // Atualiza o plano do utilizador em memória (após compra)
  updatePlanLocally(plano: string): void {
    const user = this._user$.value;
    if (user) {
      this._user$.next({ ...user, plano, status: 'Ativo' });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MÉTODOS PRIVADOS (Lógica Interna)
  // ═══════════════════════════════════════════════════════════════════════════

  // Constrói um AppUser combinando Firebase Auth + Firestore
  private async _buildAppUser(fbUser: FirebaseUser): Promise<AppUser> {
    const email = fbUser.email ?? '';
    const defaultUser: AppUser = {
      uid: fbUser.uid,
      nome: fbUser.displayName ?? email.split('@')[0],
      email,
      plano: 'Nenhum plano',
      status: 'Inativo',
      emailVerified: fbUser.emailVerified,
      avatar: fbUser.photoURL ?? 'assets/default-avatar.png',
      provider: 'email'
    };

    try {
      const profileDoc = await getDoc(doc(this.firestore, 'users', fbUser.uid));
      if (profileDoc.exists()) {
        const data = profileDoc.data();
        return {
          ...defaultUser,
          nome: data['nome'] ?? defaultUser.nome,
          plano: data['plano'] ?? 'Nenhum plano',
          status: data['status'] ?? 'Inativo',
          provider: data['provider'] ?? 'email',
          avatar: data['avatar'] ?? defaultUser.avatar
        };
      }
    } catch (err) {
      console.warn('[AuthService] Não foi possível carregar perfil do Firestore:', err);
    }

    return defaultUser;
  }

  // Cria o documento do utilizador no Firestore (no registo)
  private async _createFirestoreProfile(
    fbUser: FirebaseUser,
    nome: string,
    provider: AppUser['provider']
  ): Promise<void> {
    const userRef = doc(this.firestore, 'users', fbUser.uid);
    await setDoc(userRef, {
      uid: fbUser.uid,
      nome: nome,
      email: fbUser.email,
      plano: 'Nenhum plano',
      status: 'Inativo',
      provider: provider,
      avatar: fbUser.photoURL ?? 'assets/default-avatar.png',
      createdAt: serverTimestamp()
    });
  }

  // Garante que o perfil existe no Firestore (para login Google)
  private async _ensureFirestoreProfile(
    fbUser: FirebaseUser,
    provider: AppUser['provider']
  ): Promise<void> {
    const userRef = doc(this.firestore, 'users', fbUser.uid);
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      const nome = fbUser.displayName ?? (fbUser.email ?? '').split('@')[0];
      await this._createFirestoreProfile(fbUser, nome, provider);
    }
  }

  // Verifica se um email já está em uso antes do registo
  private async _checkEmailAvailability(email: string): Promise<void> {
    const methods = await fetchSignInMethodsForEmail(this.auth, email);
    if (methods.length > 0) {
      const isGoogle = methods.includes('google.com');
      throw new AuthError(
        'auth/email-already-in-use',
        isGoogle
          ? 'Este email já está registado com o Google. Por favor, use o botão "Entrar com Google".'
          : 'Este email já está em uso. Por favor, inicia sessão ou recupera a palavra-passe.'
      );
    }
  }

  // Mapeia erros do Firebase para mensagens amigáveis
  private _mapFirebaseError(error: any): AuthError {
    // Se já é um AuthError personalizado, retorna diretamente
    if (error instanceof AuthError) return error;

    const messages: Record<string, string> = {
      'auth/invalid-email':                      'O formato do email é inválido.',
      'auth/user-not-found':                     'Não existe nenhuma conta com este email.',
      'auth/wrong-password':                     'Palavra-passe incorreta.',
      'auth/invalid-credential':                 'Email ou palavra-passe incorretos.',
      'auth/email-already-in-use':               'Este email já está em uso.',
      'auth/weak-password':                      'A palavra-passe deve ter pelo menos 6 caracteres.',
      'auth/popup-closed-by-user':               'O popup foi fechado antes de concluir o login.',
      'auth/popup-blocked':                      'O navegador bloqueou o popup. Por favor, permite popups para este site.',
      'auth/network-request-failed':             'Sem ligação à internet. Verifica a tua rede.',
      'auth/too-many-requests':                  'Demasiadas tentativas. Por favor, aguarda alguns minutos.',
      'auth/operation-not-allowed':              'Este método de login não está ativo.',
      'auth/account-exists-with-different-credential': 'Este email está associado a outro método de login.',
    };

    const message = messages[error.code] ?? error.message ?? 'Ocorreu um erro inesperado. Tenta novamente.';
    return new AuthError(error.code ?? 'auth/unknown', message);
  }
}