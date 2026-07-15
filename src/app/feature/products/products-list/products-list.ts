import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [AsyncPipe,JsonPipe],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export default class ProductsList {
  public productList$  = new BehaviorSubject<any>([]);
  private httpProducts = inject (HttpProducts);

  //Hook: saber cuando se inicializa el componente
  ngOnInit () {
    // Realizar la petición de los datos de API para que sean obtenidos antes que el componente cargue (visualmente)
    this.httpProducts.getProduct().subscribe({
      next: (data) => {
        console.log(data);
        //Asignar la lista de productos al observable
        this.productList$.next(data.data) //solo la lista de los productos
      },
      error: (error) => {
        console.error (error);
      },
      complete: () => {
        console.log ('lista productos')
      }
    });
  }



}
