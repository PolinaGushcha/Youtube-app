import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: '',
    // component: LayoutComponent,
    loadComponent: () => {
      return import('./layout.component').then(m => m.LayoutComponent);
    },
  },
  {
    path: ':id',
    loadComponent: () => {
      return import('../../youtube/search/search-item/search-item.component').then(m => m.SearchItemComponent);
    },
  },
];
