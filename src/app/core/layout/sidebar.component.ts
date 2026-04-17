import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  template: `
    <nav class="sidebar">
      <a routerLink="/dashboard" class="logo" title="Accueil — Dashboard">
        <div class="logo-icon"></div>
        <span>SmartInventory</span>
      </a>

      <ul>
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <span class="icon">▦</span> {{ 'nav.dashboard' | translate }}
          </a>
        </li>
        @if (showCatalog()) {
          <li>
            <a routerLink="/products" routerLinkActive="active">
              <span class="icon">◈</span> {{ 'nav.products' | translate }}
            </a>
          </li>
        }
        <li>
          <a routerLink="/stock" routerLinkActive="active">
            <span class="icon">◫</span> {{ 'nav.stock' | translate }}
          </a>
        </li>
        <li>
          <a routerLink="/movements" routerLinkActive="active">
            <span class="icon">⇄</span> {{ 'nav.movements' | translate }}
          </a>
        </li>
        <li>
          <a routerLink="/alerts" routerLinkActive="active">
            <span class="icon">◉</span> {{ 'nav.alerts' | translate }}
          </a>
        </li>
        <li>
          <a routerLink="/stores" routerLinkActive="active">
            <span class="icon">⊞</span> {{ 'nav.stores' | translate }}
          </a>
        </li>
        @if (showCatalog()) {
          <li>
            <a routerLink="/reports" routerLinkActive="active">
              <span class="icon">◱</span> {{ 'nav.reports' | translate }}
            </a>
          </li>
        }
        @if (isAdmin()) {
          <li class="section-label">{{ 'nav.admin' | translate }}</li>
          <li>
            <a routerLink="/admin/users" routerLinkActive="active">
              <span class="icon">◎</span> {{ 'nav.users' | translate }}
            </a>
          </li>
          <li>
            <a routerLink="/admin/roles" routerLinkActive="active">
              <span class="icon">⚙</span> {{ 'nav.roles' | translate }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar { width: 240px; background: var(--color-sidebar-bg); height: 100vh; display: flex; flex-direction: column; padding: 24px 0; flex-shrink: 0; }
    .logo { display: flex; align-items: center; gap: 10px; padding: 0 20px 24px; font-size: 15px; font-weight: 600; color: var(--color-text-primary); border-bottom: 1px solid var(--color-border); text-decoration: none; cursor: pointer; transition: opacity .15s; }
    .logo:hover { opacity: 0.92; }
    .logo-icon { width: 28px; height: 28px; background: var(--color-accent); border-radius: 6px; }
    ul { list-style: none; padding: 16px 0; margin: 0; flex: 1; }
    li a { display: flex; align-items: center; gap: 10px; padding: 10px 20px; color: var(--color-text-secondary); text-decoration: none; font-size: 14px; transition: all .15s; border-radius: 0; }
    li a:hover { color: var(--color-text-primary); background: var(--color-item-hover); }
    li a.active { color: var(--color-text-primary); background: var(--color-item-active); border-right: 2px solid var(--color-accent); }
    .section-label { font-size: 11px; color: var(--color-text-muted); padding: 16px 20px 4px; text-transform: uppercase; letter-spacing: .08em; }
    .icon { font-size: 14px; width: 18px; text-align: center; }
  `]
})
export class SidebarComponent {
  private auth = inject(AuthService);
  isAdmin = computed(() => this.auth.currentUser()?.role === 'Admin');
  /** Gestionnaire & Admin : catalogue + rapports (cahier §2.2). */
  showCatalog = computed(() => {
    const r = this.auth.currentUser()?.role;
    return r === 'Admin';
  });
}