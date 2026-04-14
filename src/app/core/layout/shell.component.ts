import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar.component';
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  template: `
    <div class="shell">
      <app-sidebar />
      <div class="main">
        <app-navbar />
        <div class="content">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .shell { display: flex; height: 100vh; background: var(--color-app-bg); color: var(--color-text-primary); }
    .main  { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .content { flex: 1; overflow-y: auto; padding: 24px; }
  `]
})
export class ShellComponent {}