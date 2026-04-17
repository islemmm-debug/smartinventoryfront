import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

/** Liens transverses entre les pages métier (affiché sous le titre de page). */
@Component({
  selector: 'app-page-quick-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="quick-nav" aria-label="Navigation rapide">
      <a routerLink="/dashboard" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
      @if (showCatalog()) {
        <span class="sep">·</span>
        <a routerLink="/products" routerLinkActive="on">Produits</a>
      }
      <span class="sep">·</span>
      <a routerLink="/stock" routerLinkActive="on">Stock</a>
      <span class="sep">·</span>
      <a routerLink="/movements" routerLinkActive="on">Mouvements</a>
      <span class="sep">·</span>
      <a routerLink="/alerts" routerLinkActive="on">Alertes</a>
      <span class="sep">·</span>
      <a routerLink="/stores" routerLinkActive="on">Magasins</a>
      @if (showCatalog()) {
        <span class="sep">·</span>
        <a routerLink="/reports" routerLinkActive="on">Rapports</a>
      }
      @if (isAdmin()) {
        <span class="sep">·</span>
        <a routerLink="/admin/users" routerLinkActive="on">Utilisateurs</a>
        <span class="sep">·</span>
        <a routerLink="/admin/roles" routerLinkActive="on">Rôles</a>
      }
    </nav>
  `,
  styles: [
    `
      .quick-nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 2px;
        font-size: 12px;
        margin-bottom: 16px;
      }
      .quick-nav a {
        color: #6b7594;
        text-decoration: none;
        padding: 2px 6px;
        border-radius: 4px;
        transition: color 0.15s, background 0.15s;
      }
      .quick-nav a:hover {
        color: #fff;
        background: #232940;
      }
      .quick-nav a.on {
        color: #4a6cf7;
        font-weight: 500;
        background: rgba(74, 108, 247, 0.12);
      }
      .sep {
        color: #3d4566;
        user-select: none;
        padding: 0 2px;
      }
    `,
  ],
})
export class PageQuickNavComponent {
  private auth = inject(AuthService);
  isAdmin = computed(() => this.auth.currentUser()?.role === 'Admin');
  showCatalog = computed(() => {
    const r = this.auth.currentUser()?.role;
    return r === 'Admin';
  });
}
