import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * AuthGuard — Protege rotas que requerem utilizador autenticado.
 * Se não autenticado → redireciona para /login com returnUrl.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  private router      = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.authService.initialized$.pipe(
      // Espera o Firebase terminar de inicializar antes de decidir
      filter((initialized): initialized is true => initialized === true),
      take(1),
      switchMap(() =>
        this.authService.user$.pipe(
          take(1),
          map(user => {

            // Não autenticado → vai para login
            if (!user) {
              this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url }
              });
              return false;
            }

            // Autenticado → permite acesso
            return true;
          })
        )
      )
    );
  }
}