import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  // ✅ Verificação segura do browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getUserFromStorage(): User | null {
    if (this.isBrowser()) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
    if (!this.isBrowser()) return null;

    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser()) return;

    const user = this.getUserFromStorage();
    const token = this.getToken();

    if (user && token) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const token = this.generateToken();
          const user: User = {
            id: this.generateId(),
            email: email,
            nome: email.split('@')[0],
            plano: 'Plano YouTube sem Anúncios',
            dataCadastro: new Date().toISOString(),
            ativo: true
          };

          if (this.isBrowser()) {
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
          }

          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);

          observer.next({ token, user, success: true });
          observer.complete();
        } else {
          observer.error({
            success: false,
            message: 'Email ou senha inválidos'
          });
        }
      }, 1000);
    });
  }

  register(email: string, password: string, nome: string, plano: string): Observable<LoginResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (email && password.length >= 6 && nome) {
          const token = this.generateToken();
          const user: User = {
            id: this.generateId(),
            email,
            nome,
            plano: plano || 'Plano YouTube sem Anúncios',
            dataCadastro: new Date().toISOString(),
            ativo: true
          };

          if (this.isBrowser()) {
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
          }

          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);

          observer.next({ token, user, success: true });
          observer.complete();
        } else {
          observer.error({
            success: false,
            message: 'Preencha todos os campos corretamente'
          });
        }
      }, 1000);
    });
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }

    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  private generateId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  updatePlano(novoPlano: string): void {
    const user = this.currentUserSubject.value;

    if (user) {
      user.plano = novoPlano;

      if (this.isBrowser()) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      this.currentUserSubject.next({ ...user });
    }
  }
}