import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environment/environment';

function isAuthRequest(url: string): boolean {
  return /\/auth\/(login|register|forgot-password|reset-password)/i.test(url);
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(NbToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const msg =
        (err.error && typeof err.error === 'object' && 'message' in err.error
          ? String((err.error as { message?: string }).message)
          : null) || err.message || 'Erreur réseau';

      if (err.status === 401) {
        if (isAuthRequest(req.url)) {
          // Login / register invalides : géré par les formulaires
        } else {
          localStorage.removeItem('smart_inv_token');
          localStorage.removeItem('smart_inv_user');
          toastr.warning('Session expirée ou accès refusé — reconnectez-vous.', 'Authentification');
          void router.navigate(['/auth/login']);
        }
      } else if (err.status === 403) {
        if (!isAuthRequest(req.url)) {
          toastr.warning(msg, 'Accès refusé');
          void router.navigate(['/dashboard']);
        }
      } else if (err.status === 0) {
        if (!environment.useMockAuth) {
          toastr.danger(
            'API injoignable — vérifiez le backend et la configuration CORS.',
            'Réseau',
          );
        }
      } else if (err.status >= 500) {
        toastr.danger(msg, 'Erreur serveur');
      }

      return throwError(() => err);
    }),
  );
};
