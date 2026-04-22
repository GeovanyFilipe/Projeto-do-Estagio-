import { Injectable, inject, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from '@angular/fire/auth';

import {
  createUser,
  logLogin,
  logLogout
} from '@dataconnect/generated';

import { Router } from '@angular/router';

export interface User {
  id: string;
  nome: string;
  email: string;
  plano: string;
  status: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private ngZone = inject(NgZone);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    authState(this.auth).subscribe(fbUser => {
      this.ngZone.run(() => {
        if (fbUser) {
          const user = this.fbUserToUser(fbUser);
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        } else {
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
        }
      });
    });
  }

  // 🔹 Converter FirebaseUser -> objeto simples
  private fbUserToUser(fbUser: FirebaseUser): User {
    const email = fbUser.email || '';

    return {
      id: fbUser.uid,
      nome: fbUser.displayName || email.split('@')[0],
      email: email,
      plano: 'Nenhum plano',
      status: 'Inativo',
      avatar: fbUser.photoURL || 'assets/default-avatar.png'
    };
  }

  // =====================
  // LOGIN
  // =====================
  async login(email: string, password: string): Promise<User> {
    return this.ngZone.run(async () => {
      try {
        const credential = await signInWithEmailAndPassword(this.auth, email, password);
        const fbUser = credential.user;

        const user = this.fbUserToUser(fbUser);

        // 🔹 Apenas dados simples
        await logLogin({
          userId: String(fbUser.uid)
        });

        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);

        return user;
      } catch (error: any) {
        console.error('[AuthService] Erro no login:', error);
        throw error;
      }
    });
  }

  // =====================
  // REGISTO
  // =====================
  async register(email: string, password: string, nome: string): Promise<User> {
    return this.ngZone.run(async () => {
      try {
        const credential = await createUserWithEmailAndPassword(this.auth, email, password);
        const fbUser = credential.user;

        const user = this.fbUserToUser(fbUser);
        user.nome = nome;

        // ⚠️ IMPORTANTE: só strings!
        await createUser({
          id: String(fbUser.uid),
          email: String(email),
          nome: String(nome),
          passwordHash: String(password) // ⚠️ depois substituir por hash real
        });

        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);

        return user;
      } catch (error: any) {
        console.error('[AuthService] Erro no registo:', error);
        throw error;
      }
    });
  }

  // =====================
  // LOGOUT
  // =====================
  async logout(): Promise<void> {
    const userId = this.currentUserSubject.value?.id;

    await signOut(this.auth);

    if (userId) {
      try {
        await logLogout({
          userId: String(userId)
        });
      } catch (e) {
        console.warn('[AuthService] Erro ao registar logout:', e);
      }
    }

    this.ngZone.run(() => {
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    });
  }

  // =====================
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // =====================
  async updatePlano(plano: string): Promise<void> {
    const user = this.currentUserSubject.value;

    if (user) {
      const updatedUser = {
        ...user,
        plano: String(plano),
        status: 'Ativo'
      };

      this.currentUserSubject.next(updatedUser);
    }
  }
}