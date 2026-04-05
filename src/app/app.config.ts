import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbToastrModule } from '@nebular/theme';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'dark' }),
      NbLayoutModule,
      NbToastrModule.forRoot({ destroyByClick: true, duration: 4500, preventDuplicates: true }),
    ),
  ],
};
