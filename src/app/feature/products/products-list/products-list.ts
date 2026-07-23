import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../../core/services/http-products';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { RouterLink } from "@angular/router";


import Swal from 'sweetalert2'

@Component({
  selector: 'app-products-list',
  imports: [AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export default class ProductsList {
  subscriberProduct!: Subscription
  susbscriberDeleteProduct!: Subscription
  public productList$ = new BehaviorSubject<any>([]);
  private httpProducts = inject(HttpProducts);

  //Hook: saber cuando se inicializa el componente
  ngOnInit() {
    this.loadProduct();
  }

  ngOnDestroy() {
    if (this.subscriberProduct) {
      this.subscriberProduct.unsubscribe
    }

    if (this.susbscriberDeleteProduct) {
      this.susbscriberDeleteProduct.unsubscribe
    }
  }

  private loadProduct() {
    // Realizar la petición de los datos de API para que sean obtenidos antes que el componente cargue (visualmente)
    //Guarda la subscripcion al observable para tener control del mismo
    this.subscriberProduct = this.httpProducts.getProduct().subscribe({
      next: (data) => {
        console.log(data);
        //Asignar la lista de productos al observable
        this.productList$.next(data.data) //solo la lista de los productos
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('lista productos')
      }
    });
  }

  onEdit(id: string) {
    console.log('Edit', id);
  }

  onDelete(id: string) {
    // Implementa la ventana emergente con SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {

      if (result.isConfirmed) {

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        // console.log( 'Delete', id );
        // Guarda la subscripcion al Observable para tener control del mismo
        this.susbscriberDeleteProduct = this.httpProducts.deleteProductById(id).subscribe({
          next: (data) => {
            console.log(data);
            this.loadProduct();      // Ejecutar
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Peticion al API para eliminar usuario por ID');
          }
        });
      }

    });
  }
}



