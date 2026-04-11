import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Réservé Gestionnaire / Admin (produits, rapports) — cahier §2.2. */
export const catalogGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const r = auth.getRole();
  if (r === 'Admin' || r === 'Manager') return true;
  return router.createUrlTree(['/dashboard']);
};
