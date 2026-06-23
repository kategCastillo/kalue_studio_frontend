import { Routes } from '@angular/router';


export const routes: Routes = [
  {path: 'coleccion', loadComponent: () => import ('./pages/coleccion/coleccion').then ( m => m.Coleccion)},

  {path: 'productos', loadComponent: () => import ('./pages/productos/productos')},

  {path: 'nosotros', loadComponent: () => import ('./pages/nosotros/nosotros').then (m => m.Nosotros)},

  {path: 'contacto', loadComponent: () => import ('./pages/contacto/contacto').then (m => m.Contacto)},


  {path: '' , redirectTo: 'coleccion', pathMatch: 'full'},
  {path: '**', redirectTo: 'coleccion', pathMatch: 'full' }
];