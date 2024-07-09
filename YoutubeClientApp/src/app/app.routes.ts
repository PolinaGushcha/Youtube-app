import { Routes } from '@angular/router';
import { SearchResultsComponent } from './youtube/pages/search/search-results/search-results.component';
import { SearchItemComponent } from './youtube/pages/search/search-item/search-item.component';
import { EmptyRouteComponent } from './youtube/pages/empty-route/empty-route.component';
import { MainComponent } from './youtube/pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    title: 'Main'
  },
  {
    path: 'results',
    component: SearchResultsComponent,
    title: 'Results title'
  },
  {
    path: 'search-item/:id',
    component: SearchItemComponent,
    title: 'Item title'
  },
  {
    path: '**',
    component: EmptyRouteComponent,
    title: '404'
  },
];
