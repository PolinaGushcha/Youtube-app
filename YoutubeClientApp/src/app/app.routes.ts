import { Routes } from '@angular/router';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { SearchItemComponent } from './search/search-item/search-item.component';

export const routes: Routes = [
  {
    path: 'results',
    component: SearchResultsComponent,
    title: 'Results title'
  },
  {
    path: 'date',
    component: SearchResultsComponent,
    title: 'Results title'
  },
  {
    path: 'count of views',
    component: SearchResultsComponent,
    title: 'Results title'
  },
  {
    path: 'by word or sentance',
    component: SearchResultsComponent,
    title: 'Results title'
  },
  {
    path: 'search-item/:id',
    component: SearchItemComponent,
    title: 'Item title'
  }
];
