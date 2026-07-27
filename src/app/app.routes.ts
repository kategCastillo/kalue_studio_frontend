import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
    { path: 'login', loadComponent: () => import('./features/login/login') },
    { path: 'registro', loadComponent: () => import('./features/register/register') },
    
    //Listado de componentes
    { path: 'user/list', loadComponent: () => import('./features/users/user-list/user-list')},
    { path: 'contact/list', loadComponent:() => import('./features/contact/contact-list/contact-list')},
    { path: 'category/list', loadComponent: () => import('./features/category/category-list/category-list')},
    { path: 'material/list', loadComponent: () => import('./features/material/material-list/material-list')},

    //Creacion de componenetes
    { path: 'user/new/form', loadComponent: () => import('./features/users/user-new-form/user-new-form')},
    { path: 'contact/new/form', loadComponent: () => import('./features/contact/contact-new-form/contact-new-form')},
    { path: 'category/new/form', loadComponent: () => import('./features/category/category-new-form/category-new-form')},
    { path: 'material/new/form', loadComponent: () => import('./features/material/material-new-form/material-new-form')},

    //edicion de componenetes
    { path: 'user/edit/form/:id', loadComponent: () => import('./features/users/user-edit-form/user-edit-form')},
    { path: 'contact/edit/form/:id', loadComponent:() => import('./features/contact/contact-edit-form/contact-edit-form')},
    { path: 'category/edit/form/:id', loadComponent: () => import('./features/category/category-edit-form/category-edit-form')},
    { path: 'material/edit/form/:id', loadComponent: () => import('./features/material/material-edit-form/material-edit-form')}

]

