import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') }

]
