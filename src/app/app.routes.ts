import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
    { path: 'login', loadComponent: () => import('./features/login/login') },
    { path: 'registro', loadComponent: () => import('./features/register/register') }

]
