import { Component } from '@angular/core';
import { CardItemsCarrito } from "../../shared/components/card-items-carrito/card-items-carrito";

@Component({
  selector: 'app-carrito',
  imports: [CardItemsCarrito],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export default class Carrito {}
