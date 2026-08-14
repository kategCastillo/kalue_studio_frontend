import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ProductModal } from '../../../core/services/product-modal';

@Component({
  selector: 'app-products-modal',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './products-modal.html',
  styleUrl: './products-modal.css',
})
export default class ProductsModal {
  
  private ProductModal = inject(ProductModal)
  public selectedProduct$ = this.ProductModal.selectedProduct$;

  cerrar(): void {
    this.ProductModal.close();
  }
}