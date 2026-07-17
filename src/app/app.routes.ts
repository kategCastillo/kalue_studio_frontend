import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
    { path: 'login', loadComponent: () => import('./features/login/login') },
    { path: 'registro', loadComponent: () => import('./features/register/register') },
    { path: 'user/list', loadComponent: () => import('./features/users/user-list/user-list')},
    { path: 'user/new/form', loadComponent: () => import('./features/users/user-new-form/user-new-form')},
    { path: 'user/edit/form/:id', loadComponent: () => import('./features/users/user-edit-form/user-edit-form')}
]

