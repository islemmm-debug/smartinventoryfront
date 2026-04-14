import { Injectable, signal } from '@angular/core';
import { LanguageCode, translations } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storageKey = 'smartinventory.language';
  private readonly defaultLanguage: LanguageCode = 'fr';

  readonly language = signal<LanguageCode>(this.defaultLanguage);

  constructor() {
    const stored = localStorage.getItem(this.storageKey) as LanguageCode | null;
    this.setLanguage(stored === 'en' || stored === 'fr' ? stored : this.defaultLanguage);
  }

  setLanguage(language: LanguageCode): void {
    this.language.set(language);
    localStorage.setItem(this.storageKey, language);
    document.documentElement.lang = language;
  }

  toggleLanguage(): void {
    this.setLanguage(this.language() === 'fr' ? 'en' : 'fr');
  }

  t(key: string): string {
    const currentLanguage = this.language();
    return translations[currentLanguage][key] ?? translations.fr[key] ?? key;
  }
}
