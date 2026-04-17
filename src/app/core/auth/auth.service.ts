import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import type { UserRole } from '../models/user.model';
import { DEFAULT_ROLE_PERMISSIONS } from '../security/role-permission.defaults';

// ─── Interfaces ───────────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: UserInfo;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  /** Périmètre magasin (gestionnaire / magasinier). Admin = vue globale. */
  assignedStoreId?: string;
  /** Si le backend envoie des claims explicites, ils priment sur la matrice rôle. */
  permissionCodes?: string[];
}

// ─── Token payload (JWT decoded) ─────────────────────────────
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API = environment.apiUrl;
  private readonly TOKEN_KEY = 'smart_inv_token';
  private readonly REFRESH_TOKEN_KEY = 'smart_inv_refresh_token';
  private readonly USER_KEY = 'smart_inv_user';

  // ── Reactive current user (signal) ──────────────────────────
  currentUser = signal<UserInfo | null>(this.loadUserFromStorage());

  // ─────────────────────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────────────────────
  login(payload: LoginRequest) {
    if (environment.useMockAuth) {
      return this.mockLogin(payload);
    }
    return this.http.post<AuthResponse>(`${this.API}/Auth/login`, payload).pipe(
      tap((res) => this.saveSession(res)),
      catchError((err: { status?: number; error?: { message?: string; code?: string } }) => {
        if (err.status === 403 && err.error?.code === 'ACCOUNT_PENDING') {
          return throwError(
            () => new Error('Votre compte est en attente de validation par un administrateur.'),
          );
        }
        const msg = err.error?.message || 'Email ou mot de passe incorrect';
        return throwError(() => new Error(msg));
      }),
    );
  }

  // ─────────────────────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────────────────────
  register(payload: RegisterRequest) {
    if (environment.useMockAuth) {
      return of(null as unknown as AuthResponse).pipe(delay(500));
    }
    return this.http.post<AuthResponse>(`${this.API}/Auth/register`, payload).pipe(
      tap((res) => this.saveSession(res)),
      catchError((err) => {
        const msg = err.error?.message || "Erreur lors de l'inscription";
        return throwError(() => new Error(msg));
      }),
    );
  }

  // ─────────────────────────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────────────────────────
  forgotPassword(email: string) {
    return this.http.post(`${this.API}/Auth/forgot-password`, { email }).pipe(
      catchError((err) => {
        const msg = err.error?.message || "Erreur lors de l'envoi du mail";
        return throwError(() => new Error(msg));
      }),
    );
  }

  // ─────────────────────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────────────────────
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  // ─────────────────────────────────────────────────────────────
  // REFRESH TOKEN
  // ─────────────────────────────────────────────────────────────
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    return this.http
      .post<RefreshTokenResponse>(`${this.API}/Auth/refresh`, {
        refreshToken,
      })
      .pipe(
        tap((res) => this.updateTokens(res)),
        catchError((err) => {
          this.logout();
          return throwError(() => new Error('Session expired. Please login again.'));
        }),
      );
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private updateTokens(res: RefreshTokenResponse): void {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
  }

  // ─────────────────────────────────────────────────────────────
  // TOKEN HELPERS
  // ─────────────────────────────────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    // Session mock : pas de dépendance au décodage JWT (évite blocage si ancien token / caractères spéciaux)
    if (this.isMockDevToken(token)) {
      return !!this.currentUser()?.email;
    }
    return !this.isTokenExpired(token);
  }

  getRole(): string {
    return this.currentUser()?.role ?? '';
  }

  hasRole(...roles: string[]): boolean {
    return roles.includes(this.getRole());
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
  isUser(): boolean {
    return this.getRole() === 'User';
  }

  // ─────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────────────────────
  private mockLogin(payload: LoginRequest): Observable<AuthResponse> {
    const role = this.inferMockRole(payload.email);
    const perms = [...DEFAULT_ROLE_PERMISSIONS[role]];
    const res: AuthResponse = {
      token: this.buildMockJwt(role, payload.email),
      refreshToken: 'mock-refresh-token',
      expiresIn: 86400,
      user: {
        id: 'mock-1',
        firstName: 'Démo',
        lastName: 'Utilisateur',
        email: payload.email,
        role,
        isActive: true,
        assignedStoreId: role === 'Admin' ? undefined : 'store-001',
        permissionCodes: perms,
      },
    };
    return of(res).pipe(
      delay(350),
      tap((r) => this.saveSession(r)),
    );
  }

  private inferMockRole(email: string): UserRole {
    const e = email.toLowerCase();
    if (e.includes('admin')) return 'Admin';
    return 'User';
  }

  /** Token de démo : 3e segment = « signature » (reconnu par isMockDevToken). */
  private isMockDevToken(token: string): boolean {
    return environment.useMockAuth && token.split('.').pop() === 'signature';
  }

  private buildMockJwt(role: string, email: string): string {
    const header = this.encodeB64Url({ alg: 'none', typ: 'JWT' });
    const payload = this.encodeB64Url({
      sub: 'mock-sub',
      email,
      role,
      exp: Math.floor(Date.now() / 1000) + 86400,
      iat: Math.floor(Date.now() / 1000),
    });
    return `${header}.${payload}.signature`;
  }

  private encodeB64Url(obj: object): string {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private saveSession(res: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }

  private loadUserFromStorage(): UserInfo | null {
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private decodeToken(token: string): JwtPayload | null {
    const segment = token.split('.')[1];
    if (!segment) return null;
    return this.decodeB64UrlJson(segment);
  }

  private decodeB64UrlJson(segment: string): JwtPayload | null {
    try {
      const padded = segment + '==='.slice((segment.length + 3) % 4);
      const b64 = padded.replace(/-/g, '+').replace(/_/g, '/');
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const json = new TextDecoder().decode(bytes);
      return JSON.parse(json) as JwtPayload;
    } catch {
      try {
        return JSON.parse(atob(segment)) as JwtPayload;
      } catch {
        return null;
      }
    }
  }

  private isTokenExpired(token: string): boolean {
    if (this.isMockDevToken(token)) {
      const payload = this.decodeToken(token);
      if (!payload?.exp) return false;
      return payload.exp * 1000 < Date.now();
    }
    const payload = this.decodeToken(token);
    if (!payload) return true;
    return payload.exp * 1000 < Date.now();
  }
}
