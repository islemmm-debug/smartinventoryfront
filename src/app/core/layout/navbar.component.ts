import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../services/theme.service';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <header class="navbar">
      <div class="left">
        <span class="page-title">{{ title() | translate }}</span>
      </div>
      <div class="right">
        <button type="button" class="control-button" (click)="toggleTheme()">
          {{ (themeService.theme() === 'dark' ? 'common.themeLight' : 'common.themeDark') | translate }}
        </button>
        <button type="button" class="control-button" (click)="toggleLanguage()">
          {{ languageService.language() === 'fr' ? 'EN' : 'FR' }}
        </button>
        <span class="role-badge">{{ role() }}</span>
        <button type="button" (click)="logout()">{{ 'common.logout' | translate }}</button>
      </div>
    </header>
  `,
  styles: [`
    .navbar { height: 56px; background: var(--color-navbar-bg); border-bottom: 1px solid var(--color-border-soft); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; flex-shrink: 0; }
    .page-title { color: var(--color-text-primary); font-size: 15px; font-weight: 500; }
    .right { display: flex; align-items: center; gap: 14px; }
    .role-badge { font-size: 12px; padding: 3px 10px; border-radius: 20px; background: var(--color-pill-bg); color: var(--color-accent); }
    button { font-size: 13px; color: var(--color-text-secondary); background: none; border: 1px solid var(--color-border); border-radius: 6px; padding: 5px 12px; cursor: pointer; transition: all .15s; }
    button:hover { color: var(--color-accent); border-color: var(--color-accent); }
    .control-button { min-width: 84px; }
  `],
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  readonly themeService = inject(ThemeService);
  readonly languageService = inject(LanguageService);

  title = signal('nav.dashboard');
  role = signal(this.auth.getRole());

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        let r = this.router.routerState.snapshot.root;
        while (r.firstChild) {
          r = r.firstChild;
        }
        const t = r.data['title'] as string | undefined;
        this.title.set(this.mapRouteTitle(t));
        this.role.set(this.auth.getRole());
      });
  }

  private mapRouteTitle(title?: string): string {
    switch (title) {
      case 'Dashboard': return 'nav.dashboard';
      case 'Produits': return 'nav.products';
      case 'Stock': return 'nav.stock';
      case 'Mouvements': return 'nav.movements';
      case 'Alertes': return 'nav.alerts';
      case 'Magasins': return 'nav.stores';
      case 'Rapports & IA': return 'nav.reports';
      case 'Utilisateurs': return 'nav.users';
      case 'Rôles & permissions': return 'nav.roles';
      default: return 'nav.dashboard';
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  logout(): void {
    this.auth.logout();
  }
}
