import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HttpCart } from '../../../core/services/http-cart';
import { HttpAuth } from '../../../core/services/http-auth';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ProductModal } from '../../../core/services/product-modal';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: any;

  public count: any = 0;
  public adding: any = false; // deshabilita el botón mientras la petición está en curso

  
  private productModal = inject (ProductModal)
  @Output() add = new EventEmitter<any>();

  public faEye = faEye;

  onView(item: any){
    this.productModal.open(item);
  }

  addCart() {
    this.adding = true;
    this.add.emit({ product: this.product, count: this.count } );
  }

  increment() {
    console.log( this.product );

    if (this.count < this.product.stock) {
      this.count++;
      console.log( this.count );
    }
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
    }
  }
}
