import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConfigService } from '../services/app-config.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private appConfig: AppConfigService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token();

    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        const isAuthEndpoint =
          typeof req.url === 'string' &&
          (req.url.includes('/auth/login') || req.url.includes('/auth/register'));
        const isBackendApi401 =
          error.status === 401 &&
          typeof error.url === 'string' &&
          this.isBackendApiUrl(error.url);

        if (isBackendApi401 && !isAuthEndpoint) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }

        const message =
          (typeof error.error === 'object' && error.error?.message) ||
          (typeof error.error === 'string' && error.error) ||
          error.message ||
          'Request failed';
        this.toastr.error(message);
        return throwError(() => error);
      })
    );
  }

  private isBackendApiUrl(url: string): boolean {
    const base = this.appConfig.apiUrl;

    if (base.startsWith('http://') || base.startsWith('https://')) {
      return url.startsWith(base);
    }

    try {
      const parsed = new URL(url, window.location.origin);
      return parsed.pathname.startsWith(base);
    } catch {
      return url.includes(base);
    }
  }
}
