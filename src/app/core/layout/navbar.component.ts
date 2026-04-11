import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header class="navbar">
      <div class="left">
        <span class="page-title">{{ title() }}</span>
      </div>
      <div class="right">
        <span class="role-badge">{{ role() }}</span>
        <button type="button" (click)="logout()">Déconnexion</button>
      </div>
    </header>
  `,
  styles: [`
    .navbar { height: 56px; background: #0f1117; border-bottom: 1px solid #1e2538; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; flex-shrink: 0; }
    .page-title { color: #ffffff; font-size: 15px; font-weight: 500; }
    .right { display: flex; align-items: center; gap: 14px; }
    .role-badge { font-size: 12px; padding: 3px 10px; border-radius: 20px; background: #1e2d5a; color: #4a6cf7; }
    button { font-size: 13px; color: #6b7594; background: none; border: 1px solid #2a3050; border-radius: 6px; padding: 5px 12px; cursor: pointer; transition: all .15s; }
    button:hover { color: #ff6b6b; border-color: #ff6b6b; }
  `],
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  title = signal('SmartInventory');
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
        this.title.set(t ?? 'SmartInventory');
        this.role.set(this.auth.getRole());
      });
  }

  logout(): void {
    this.auth.logout();
  }
}
