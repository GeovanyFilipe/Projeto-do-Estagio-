import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';

import { BehaviorSubject, from, switchMap, map, catchError } from 'rxjs';

export interface User {
  id: string;
  email: string;
  nome: string;
  plano: string;
  dataCadastro: string;
  ativo: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth = inject(Auth);

  user$ = authState(this.auth);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.user$.subscribe(fbUser => {
      if (fbUser) {
        this.currentUserSubject.next({
          id: fbUser.uid,
          email: fbUser.email ?? '',
          nome: fbUser.displayName ?? 'Usuário',
          plano: 'Nenhum plano',
          dataCadastro: new Date().toLocaleDateString(),
          ativo: true
        });
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string, nome: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(res =>
        from(updateProfile(res.user, { displayName: nome })).pipe(
          map(() => res.user)
        )
      )
    );
  }

  logout() {
    return signOut(this.auth);
  }
}