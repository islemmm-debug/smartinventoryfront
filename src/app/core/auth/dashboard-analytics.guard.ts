import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RbacService } from '../security/rbac.service';

/**
 * Magasiniers : pas d’analytics agrégées — orientation vers les opérations.
 */
export const dashboardAnalyticsGuard: CanActivateFn = () => {
  const rbac = inject(RbacService);
  const router = inject(Router);
  if (rbac.showAnalyticsDashboard()) return true;
  return router.createUrlTree(['/movements']);
};
