import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HeadersInterceptor } from './core/HeadersInterceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideToastr(),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([HeadersInterceptor])),
  ],
};
