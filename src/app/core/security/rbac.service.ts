import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { P } from './app-permissions';
import { DEFAULT_ROLE_PERMISSIONS } from './role-permission.defaults';

/**
 * Couche RBAC unique : permissions effectives = claims JWT si présents, sinon matrice rôle par défaut.
 */
@Injectable({ providedIn: 'root' })
export class RbacService {
  private auth = inject(AuthService);

  /** Ensemble des codes permission actifs pour l’utilisateur courant. */
  readonly permissionSet = computed(() => {
    const u = this.auth.currentUser();
    if (!u?.isActive) return new Set<string>();
    if (u.permissionCodes != null && u.permissionCodes.length > 0) {
      return new Set(u.permissionCodes);
    }
    const role = u.role;
    return new Set<string>(DEFAULT_ROLE_PERMISSIONS[role] ?? []);
  });

  can(code: string): boolean {
    return this.permissionSet().has(code);
  }

  canAny(...codes: string[]): boolean {
    const s = this.permissionSet();
    return codes.some(c => s.has(c));
  }

  canAll(...codes: string[]): boolean {
    const s = this.permissionSet();
    return codes.every(c => s.has(c));
  }

  /**
   * null = agrégation globale (admin).
   * string = un magasin (gestionnaire / magasinier affecté).
   */
  effectiveStoreId(): string | null {
    const u = this.auth.currentUser();
    if (!u || u.role === 'Admin') return null;
    return u.assignedStoreId ?? null;
  }

  /** Indique si les écrans analytiques du dashboard sont autorisés. */
  showAnalyticsDashboard(): boolean {
    return this.can(P.VIEW_GLOBAL_DASHBOARD) || this.can(P.VIEW_STORE_DASHBOARD);
  }

  /** Route sûre après refus d’accès (évite boucle sur /dashboard pour un magasinier). */
  navigationFallbackUrl(): string {
    if (this.showAnalyticsDashboard()) return '/dashboard';
    if (this.can(P.CREATE_MOVEMENT)) return '/movements';
    return '/auth/login';
  }
}
