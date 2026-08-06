import { HttpClient } from '@angular/common/http';
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
  private httpProducts = inject(HttpProducts);
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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        this.subscriberDeleteProduct = this.httpProducts.deleteProductById(id).subscribe({
          next: (data) => {
            console.log(data);
            this.loadProducts();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {}
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



