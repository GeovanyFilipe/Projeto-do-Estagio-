import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDataConnect, getDataConnect, connectDataConnectEmulator } from '@angular/fire/data-connect';
import { connectorConfig } from '@dataconnect/generated';
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

    // Firebase — inicialização única e simples
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDataConnect(() => {
      const dc = getDataConnect(connectorConfig);
      if (!environment.production) {
        connectDataConnectEmulator(dc, 'localhost', 9399);
      }
      return dc;
    }),
  ]
};
