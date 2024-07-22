import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'search-item/:id',
        loadComponent: () =>
          import('../../youtube/search/search-item/search-item.component').then(m => m.SearchItemComponent),
      },
    ]
  },
];