import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/auth/login']);
    }

    const roles = (route.data['roles'] || []) as UserRole[];
    return this.authService.refreshProfile().pipe(
      map(() => (!roles.length || this.authService.hasRole(roles) ? true : this.router.createUrlTree(['/']))),
      catchError(() => of(this.router.createUrlTree(['/auth/login'])))
    );
  }
}
