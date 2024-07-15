import { Routes } from '@angular/router';
import { SearchResultsComponent } from './youtube/search/search-results/search-results.component';
import { SearchItemComponent } from './youtube/search/search-item/search-item.component';
import { EmptyRouteComponent } from './youtube/empty-route/empty-route.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { canActivateAuth } from './auth/access.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SearchResultsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'search-item/:id',
        component: SearchItemComponent,
      },
      {
        path: '**',
        component: EmptyRouteComponent,
      },
    ],
    canActivate: [canActivateAuth]
  },
];
