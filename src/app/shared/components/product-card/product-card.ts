import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HttpProducts } from '../../../core/services/http-products';;

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ProductModal } from '../../../core/services/product-modal';
// import { envirenvironmentonment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: any;
  @Output() add = new EventEmitter<any>();

  // serverHostUrl: string = environment.serverHostUrl; // URL del servidor para las imágenes

  public count: any = 0;
  public adding: any = false; // deshabilita el botón mientras la petición está en curso

  private productModal = inject (ProductModal)
  public httpProducts = inject(HttpProducts);

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

  // getMainImageUrl( product: any ): string {
  //   if ( !product || product.images && product.images.length === 0 ) {
  //     return 'assets/images/default-product.jpg'; // Ruta de la imagen por defecto
  //   }
    
  //   const mainImage = product.images.find((img: any) => img.isMain || product.images[0]);
  //   return `${this.serverHostUrl}${mainImage.url.startsWith('/') ? mainImage.url.slice(1) : mainImage.url}`; // Ruta de la imagen por defecto
  // }
}