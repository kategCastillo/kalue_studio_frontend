import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
    { path: 'login', loadComponent: () => import('./features/login/login') },
    { path: 'registro', loadComponent: () => import('./features/register/register') },
    { path: 'user/list', loadComponent: () => import('./features/users/user-list/user-list')},
    { path: 'contact/list', loadComponent:() => import('./features/contact/contact-list/contact-list')},
    { path: 'user/new/form', loadComponent: () => import('./features/users/user-new-form/user-new-form')},
    { path: 'contact/new/form', loadComponent: () => import('./features/contact/contact-new-form/contact-new-form')},
    { path: 'user/edit/form/:id', loadComponent: () => import('./features/users/user-edit-form/user-edit-form')},
    { path: 'contact/edit/form/:id', loadComponent:() => import('./features/contact/contact-edit-form/contact-edit-form') }
]

