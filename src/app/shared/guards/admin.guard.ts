import { map, tap } from 'rxjs/operators';
import { AuthService } from './../../core/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLogged()
      .pipe(
        map(user => user === null ? false : true),
        tap(isLogged => {
          if (!isLogged) {
            this.router.navigate(['/auth/login']);
          }
        }),
      );
  }

}
