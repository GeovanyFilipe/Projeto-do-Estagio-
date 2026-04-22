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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.authService.initialized$.pipe(
      filter(initialized => initialized), // espera Firebase inicializar
      take(1),
      switchMap(() =>
        this.authService.isAuthenticated$.pipe(
          take(1),
          map(isAuth => {
            if (isAuth) {
              return true;
            }

            this.router.navigate(['/login'], {
              queryParams: { returnUrl: state.url }
            });

            return false;
          })
        )
      )
    );
  }
}