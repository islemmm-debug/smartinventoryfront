import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from './environment/environment';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <router-outlet />
    @if (showBanner()) {
      <div
        class="api-debug"
        style="position:fixed; bottom:16px; right:16px; background:#1a1f2e;
                border:1px solid #2a3050; border-radius:10px; padding:14px 18px;
                font-size:13px; color:white; z-index:9999; min-width:260px;">
        <strong style="color:#9aa3bc">API Status</strong>
        <div style="margin-top:8px; display:flex; align-items:center; gap:8px;">
          <span
            [style.background]="
              status() === 'ok' ? '#4ade80' : status() === 'error' ? '#f87171' : '#fbbf24'
            "
            style="width:10px;height:10px;border-radius:50%;flex-shrink:0"></span>
          <span>{{ message() }}</span>
        </div>
        <div style="margin-top:8px;">
          <button
            type="button"
            (click)="test()"
            style="font-size:12px; padding:4px 10px; border-radius:6px;
                       border:1px solid #2a3050; background:transparent;
                       color:#9aa3bc; cursor:pointer;">
            Re-tester
          </button>
        </div>
      </div>
    }
  `,
})
export class AppComponent {
  private http = inject(HttpClient);
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  readonly showBanner = signal(environment.showApiDebugBanner);

  status = signal<'pending' | 'ok' | 'error'>('pending');
  message = signal('Test en cours...');

  constructor() {
    this.themeService.theme();
    this.languageService.language();

    if (environment.showApiDebugBanner) {
      this.test();
    }
  }

  test() {
    this.status.set('pending');
    this.message.set("Connexion à l'API...");

    this.http
      .post<{ token?: string }>(`${environment.apiUrl}/auth/login`, {
        email: 'test@test.com',
        password: 'test',
      })
      .subscribe({
        next: () => {
          this.status.set('ok');
          this.message.set('✅ API connectée !');
        },
        error: (err: { status?: number }) => {
          if (err.status === 0) {
            this.status.set('error');
            this.message.set('❌ Backend non démarré');
          } else if (err.status === 401 || err.status === 400) {
            this.status.set('ok');
            this.message.set('✅ API connectée (credentials invalides)');
          } else if (err.status === 404) {
            this.status.set('error');
            this.message.set('⚠️ Route /api/auth/login introuvable');
          } else {
            this.status.set('error');
            this.message.set(`Erreur ${err.status}`);
          }
        },
      });
  }
}
