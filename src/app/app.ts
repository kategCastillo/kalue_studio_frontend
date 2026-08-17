import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/components/footer/footer";
import { Header } from "./shared/components/header/header";
import ProductsModal from './features/products/products-modal/products-modal';
import OrderModalComponent from './features/order/order-modal/order-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, ProductsModal, OrderModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend_Kalue_Studio');
}
