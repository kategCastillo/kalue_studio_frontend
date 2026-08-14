import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/components/footer/footer";
import { Header } from "./shared/components/header/header";
import ProductsModal from './features/products/products-modal/products-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, ProductsModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend_Kalue_Studio');
}
