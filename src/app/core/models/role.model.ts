// ─────────────────────────────────────────────
// ROLE & PERMISSION MODEL
// src/app/core/models/role.model.ts
// ─────────────────────────────────────────────

export interface Role {
  id:          string;
  roleName:    string;
  description: string;
  permissions: Permission[];
  createdAt:   string;
}

export interface Permission {
  id:             string;
  permissionName: string;
  description:    string;
  module:         PermissionModule;
}

export type PermissionModule =
  | 'PRODUCTS'
  | 'STOCK'
  | 'MOVEMENTS'
  | 'ALERTS'
  | 'STORES'
  | 'USERS'
  | 'REPORTS'
  | 'SETTINGS';

// ── Constantes permissions ─────────────────────
export const PERMISSIONS = {
  // Products
  VIEW_PRODUCTS:   'VIEW_PRODUCTS',
  CREATE_PRODUCT:  'CREATE_PRODUCT',
  EDIT_PRODUCT:    'EDIT_PRODUCT',
  DELETE_PRODUCT:  'DELETE_PRODUCT',

  // Stock
  VIEW_STOCK:      'VIEW_STOCK',
  ADJUST_STOCK:    'ADJUST_STOCK',

  // Movements
  VIEW_MOVEMENTS:  'VIEW_MOVEMENTS',
  CREATE_MOVEMENT: 'CREATE_MOVEMENT',
  TRANSFER_STOCK:  'TRANSFER_STOCK',

  // Alerts
  VIEW_ALERTS:     'VIEW_ALERTS',
  MANAGE_ALERTS:   'MANAGE_ALERTS',

  // Stores
  VIEW_STORES:     'VIEW_STORES',
  MANAGE_STORES:   'MANAGE_STORES',

  // Users
  VIEW_USERS:      'VIEW_USERS',
  MANAGE_USERS:    'MANAGE_USERS',

  // Reports
  VIEW_REPORTS:    'VIEW_REPORTS',
  EXPORT_REPORTS:  'EXPORT_REPORTS',

  // Settings
  MANAGE_SETTINGS: 'MANAGE_SETTINGS',
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

// ── Requêtes API ──────────────────────────────
export interface CreateRoleRequest {
  roleName:      string;
  description:   string;
  permissionIds: string[];
}