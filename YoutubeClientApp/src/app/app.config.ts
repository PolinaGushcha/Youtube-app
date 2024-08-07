import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
// import { layoutRoutes } from './core/layout/layout.routers';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter([...appRoutes, ...layoutRoutes]),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideStoreDevtools({ connectInZone: true }),
  ],
};
