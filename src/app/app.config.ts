import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })
  ),
  provideHttpClient(),
  provideClientHydration(withEventReplay()),

  // Firebase
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAnalytics(() => getAnalytics()),
  ScreenTrackingService,
  UserTrackingService
]
};
