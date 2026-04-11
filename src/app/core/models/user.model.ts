// ─────────────────────────────────────────────
// USER MODEL
// src/app/core/models/user.model.ts
// ─────────────────────────────────────────────

export type UserRole = 'Admin' | 'Manager' | 'Worker';

export interface User {
  id:        string;
  firstName: string;
  lastName:  string;
  email:     string;
  role:      UserRole;
  isActive:  boolean;
  createdAt: string;
  updatedAt: string;
  storeId?:  string;       // magasin assigné (optionnel)
  store?:    StoreRef;     // objet store simplifié
}

// ── Référence légère (évite les imports circulaires) ──
export interface StoreRef {
  id:   string;
  name: string;
}

// ── Requêtes API ──────────────────────────────
export interface CreateUserRequest {
  firstName: string;
  lastName:  string;
  email:     string;
  password:  string;
  role:      UserRole;
  storeId?:  string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?:  string;
  email?:     string;
  role?:      UserRole;
  isActive?:  boolean;
  storeId?:   string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword:     string;
}