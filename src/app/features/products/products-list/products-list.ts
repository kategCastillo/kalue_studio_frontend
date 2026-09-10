import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, JsonPipe, SlicePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { HttpProducts } from '../../../core/services/http-products';
import { BehaviorSubject, Subscription } from 'rxjs';


import Swal from 'sweetalert2'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-list',
  imports: [AsyncPipe,RouterLink,FontAwesomeModule, CurrencyPipe, SlicePipe],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export default class ProductsList {
 private subscriberProduct!: Subscription;
  private subscriberDeleteProduct!: Subscription;
  // Público porque el template usa httpProducts.getMainImageUrl(item) para
  // centralizar la imagen igual que product-card, el carrito y el modal de órdenes.
  public httpProducts = inject(HttpProducts);
  public productList$ = new BehaviorSubject<any>([]);
 
  //Atributos de fontAwesome
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faPlus = faPlus;
  public faStar = faStar;
 
  onEdit(id: string) {
    console.log('edit', id);
  }
 
  onDelete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El éxito se muestra solo cuando el backend confirma la eliminación
        // (antes se mostraba el Swal de éxito antes de llamar al servicio).
        this.subscriberDeleteProduct = this.httpProducts.deleteProductById(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: 'Eliminado',
              text: res?.msg || 'El producto fue eliminado.',
              icon: 'success',
            });
            this.loadProducts();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: error?.error?.msg || 'No se pudo eliminar el producto.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
 
  private loadProducts() {
    this.subscriberProduct = this.httpProducts.getProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.productList$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }
 
  ngOnInit() {
    this.loadProducts();
  }
 
  ngOnDestroy() {
    if (this.subscriberProduct) {
      this.subscriberProduct.unsubscribe();
    }
    if (this.subscriberDeleteProduct) {
      this.subscriberDeleteProduct.unsubscribe();
    }
  }
}