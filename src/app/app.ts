import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Coleccion } from './pages/coleccion/coleccion';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contacto } from './pages/contacto/contacto';
import { Productos } from './pages/productos/productos';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend_Kalue_Studio');
}
