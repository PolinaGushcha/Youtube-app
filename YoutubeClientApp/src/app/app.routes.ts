import { Routes } from '@angular/router';
import { SearchResultsComponent } from './youtube/pages/search/search-results/search-results.component';
import { SearchItemComponent } from './youtube/pages/search/search-item/search-item.component';
import { EmptyRouteComponent } from './youtube/pages/empty-route/empty-route.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
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
        path: 'search-item/:id',
        component: SearchItemComponent,
      },
      {
        path: '**',
        component: EmptyRouteComponent,
      },
    ]
  },
];
