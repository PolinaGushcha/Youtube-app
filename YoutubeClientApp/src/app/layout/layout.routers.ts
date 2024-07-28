import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'item/:id',
        loadComponent: () => import('../item/item.component').then(m => m.ItemComponent),
      },
    ],
  },
];
