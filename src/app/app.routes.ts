import { Routes } from '@angular/router';

import { Coleccion } from './pages/coleccion/coleccion';
import { Productos } from './pages/productos/productos';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  {
    path: 'coleccion',
    component: Coleccion
  },
  {
    path: 'productos',
    component: Productos
  },
  {
    path: 'nosotros',
    component: Nosotros
  },
  {
    path: 'contacto',
    component: Contacto
  }
];