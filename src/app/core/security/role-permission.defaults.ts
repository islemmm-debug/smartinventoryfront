import type { UserRole } from '../models/user.model';
import { P, type AppPermission } from './app-permissions';

/**
 * Matrice par défaut (seed). En production : chargée depuis l’API / rôles configurables.
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, readonly AppPermission[]> = {
  Admin: [
    P.VIEW_GLOBAL_DASHBOARD,
    P.VIEW_PRODUCTS,
    P.CREATE_PRODUCT,
    P.EDIT_PRODUCT,
    P.DELETE_PRODUCT,
    P.VIEW_STOCK,
    P.ADJUST_STOCK,
    P.VIEW_MOVEMENTS,
    P.CREATE_MOVEMENT,
    P.VALIDATE_MOVEMENT,
    P.TRANSFER_STOCK,
    P.VIEW_ALERTS,
    P.MANAGE_ALERTS,
    P.VIEW_STORES,
    P.MANAGE_STORES,
    P.VIEW_REPORTS,
    P.EXPORT_REPORTS,
    P.MANAGE_USERS,
    P.MANAGE_ROLES,
    P.MANAGE_SETTINGS,
    P.MANAGE_CATEGORIES,
  ],
  Manager: [
    P.VIEW_STORE_DASHBOARD,
    P.VIEW_PRODUCTS,
    P.CREATE_PRODUCT,
    P.EDIT_PRODUCT,
    P.VIEW_STOCK,
    P.ADJUST_STOCK,
    P.VIEW_MOVEMENTS,
    P.CREATE_MOVEMENT,
    P.VALIDATE_MOVEMENT,
    P.TRANSFER_STOCK,
    P.VIEW_ALERTS,
    P.MANAGE_ALERTS,
    P.VIEW_STORES,
    P.VIEW_REPORTS,
    P.EXPORT_REPORTS,
  ],
  Worker: [
    P.VIEW_MOVEMENTS,
    P.CREATE_MOVEMENT,
    P.TRANSFER_STOCK,
    P.VIEW_STOCK,
    P.VIEW_ALERTS,
  ],
};
