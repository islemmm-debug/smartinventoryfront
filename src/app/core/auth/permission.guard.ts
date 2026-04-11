import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { RbacService } from '../security/rbac.service';

/**
 * data.permissions : liste de codes requis
 * data.permissionMode : 'all' (défaut) | 'any'
 */
export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const rbac = inject(RbacService);
  const router = inject(Router);

  const required = (route.data['permissions'] as string[] | undefined) ?? [];
  const mode = (route.data['permissionMode'] as 'all' | 'any' | undefined) ?? 'all';

  if (required.length === 0) return true;

  const ok = mode === 'any' ? rbac.canAny(...required) : rbac.canAll(...required);
  return ok ? true : router.createUrlTree([rbac.navigationFallbackUrl()]);
};
