import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { filter, switchMap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Espera o Firebase terminar de inicializar (resolver o estado da sessão)
    // ANTES de verificar se o utilizador está autenticado.
    // Sem isto, o guard lê isAuthenticated$ = false antes do Firebase responder
    // e redireciona para login mesmo que o utilizador esteja autenticado.
    return this.authService.initialized$.pipe(
      filter(initialized => initialized),  // Aguarda a 1ª emissão real do Firebase
      take(1),
      switchMap(() =>
        this.authService.isAuthenticated$.pipe(
          take(1),
          map(isAuth => {
            if (isAuth) {
              return true;
            }
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          })
        )
      )
    );
  }
}
