import { Injectable, signal } from '@angular/core';

type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'smartinventory.theme';
  private readonly defaultTheme: ThemeMode = 'dark';

  readonly theme = signal<ThemeMode>(this.defaultTheme);

  constructor() {
    const stored = localStorage.getItem(this.storageKey) as ThemeMode | null;
    this.setTheme(stored === 'light' || stored === 'dark' ? stored : this.defaultTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.body.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem(this.storageKey, theme);
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }
}
