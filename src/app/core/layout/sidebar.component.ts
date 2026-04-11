import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar">
      <a routerLink="/dashboard" class="logo" title="Accueil — Dashboard">
        <div class="logo-icon"></div>
        <span>SmartInventory</span>
      </a>

      <ul>
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <span class="icon">▦</span> Dashboard
          </a>
        </li>
        @if (showCatalog()) {
          <li>
            <a routerLink="/products" routerLinkActive="active">
              <span class="icon">◈</span> Produits
            </a>
          </li>
        }
        <li>
          <a routerLink="/stock" routerLinkActive="active">
            <span class="icon">◫</span> Stock
          </a>
        </li>
        <li>
          <a routerLink="/movements" routerLinkActive="active">
            <span class="icon">⇄</span> Mouvements
          </a>
        </li>
        <li>
          <a routerLink="/alerts" routerLinkActive="active">
            <span class="icon">◉</span> Alertes
          </a>
        </li>
        <li>
          <a routerLink="/stores" routerLinkActive="active">
            <span class="icon">⊞</span> Magasins
          </a>
        </li>
        @if (showCatalog()) {
          <li>
            <a routerLink="/reports" routerLinkActive="active">
              <span class="icon">◱</span> Rapports & IA
            </a>
          </li>
        }
        @if (isAdmin()) {
          <li class="section-label">Administration</li>
          <li>
            <a routerLink="/admin/users" routerLinkActive="active">
              <span class="icon">◎</span> Utilisateurs
            </a>
          </li>
          <li>
            <a routerLink="/admin/roles" routerLinkActive="active">
              <span class="icon">⚙</span> Rôles & permissions
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar { width: 240px; background: #1a1f2e; height: 100vh; display: flex; flex-direction: column; padding: 24px 0; flex-shrink: 0; }
    .logo { display: flex; align-items: center; gap: 10px; padding: 0 20px 24px; font-size: 15px; font-weight: 600; color: white; border-bottom: 1px solid #2a3050; text-decoration: none; cursor: pointer; transition: opacity .15s; }
    .logo:hover { opacity: 0.92; }
    .logo-icon { width: 28px; height: 28px; background: #3d6aff; border-radius: 6px; }
    ul { list-style: none; padding: 16px 0; margin: 0; flex: 1; }
    li a { display: flex; align-items: center; gap: 10px; padding: 10px 20px; color: #6b7594; text-decoration: none; font-size: 14px; transition: all .15s; border-radius: 0; }
    li a:hover { color: #ffffff; background: #232940; }
    li a.active { color: #ffffff; background: #1e2d5a; border-right: 2px solid #4a6cf7; }
    .section-label { font-size: 11px; color: #3d4566; padding: 16px 20px 4px; text-transform: uppercase; letter-spacing: .08em; }
    .icon { font-size: 14px; width: 18px; text-align: center; }
  `]
})
export class SidebarComponent {
  private auth = inject(AuthService);
  isAdmin = computed(() => this.auth.currentUser()?.role === 'Admin');
  /** Gestionnaire & Admin : catalogue + rapports (cahier §2.2). */
  showCatalog = computed(() => {
    const r = this.auth.currentUser()?.role;
    return r === 'Admin' || r === 'Manager';
  });
}