import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { HttpOrder } from '../../../core/services/http-order';
import { BehaviorSubject, Subscription } from 'rxjs';


import Swal from 'sweetalert2'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-Order-list',
  imports: [FontAwesomeModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export default class OrderList {
  //atributo de iconos Fontawesome
  faCoffee = faCoffee
  faPen = faPen

  //Atriobutos de la logica del componente 
  subscriberOrder!: Subscription
  susbscriberDeleteOrder!: Subscription
  public OrderList$ = new BehaviorSubject<any>([]);
  private httpOrder = inject(HttpOrder);

  //Hook: saber cuando se inicializa el componente
  ngOnInit() {
    this.loadOrder();
  }

  ngOnDestroy() {
    if (this.subscriberOrder) {
      this.subscriberOrder.unsubscribe
    }

    if (this.susbscriberDeleteOrder) {
      this.susbscriberDeleteOrder.unsubscribe
    }
  }

  private loadOrder() {
    // Realizar la petición de los datos de API para que sean obtenidos antes que el componente cargue (visualmente)
    //Guarda la subscripcion al observable para tener control del mismo
    this.subscriberOrder= this.httpOrder.getOrder().subscribe({
      next: (data) => {
        console.log(data);
        //Asignar la lista de productos al observable
        this.OrderList$.next(data.data) //solo la lista de los productos
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('listar ordenes')
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
        this.susbscriberDeleteOrder = this.httpOrder.deleteOrderById(id).subscribe({
          next: (data) => {
            console.log(data);
            this.loadOrder();      // Ejecutar
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Peticion al API para eliminar ordenes por ID');
          }
        });
      }

    });
  }
}



