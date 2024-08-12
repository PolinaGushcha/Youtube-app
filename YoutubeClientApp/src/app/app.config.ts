import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { layoutRoutes } from './layout/layout.routers';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { cardsReducer } from './redux/cards.reducer';
import { CardEffects } from './redux/cards.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([...appRoutes, ...layoutRoutes]),
    provideStore({ cardState: cardsReducer.reducer }),
    provideEffects([CardEffects]),
  ],
};
