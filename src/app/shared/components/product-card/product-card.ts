import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product:any 
}
