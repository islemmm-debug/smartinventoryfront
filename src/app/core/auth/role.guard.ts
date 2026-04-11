import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  // Usage in routes: data: { roles: ['Admin', 'Manager'] }
  const allowedRoles: string[] = route.data['roles'] ?? [];

  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/auth/login']);
  }

  if (allowedRoles.length === 0 || auth.hasRole(...allowedRoles)) {
    return true;
  }

  // Redirect to dashboard if not authorized
  return router.createUrlTree(['/dashboard']);
};