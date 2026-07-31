import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { HttpVariants } from '../../../core/services/http-variants';
import { BehaviorSubject, Subscription } from 'rxjs';


import Swal from 'sweetalert2'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-Variants-list',
  imports: [AsyncPipe, JsonPipe, RouterLink, FontAwesomeModule],
  templateUrl: './Variants-list.html',
  styleUrl: './Variants-list.css',
})
export default class VariantsList {
  //atributo de iconos Fontawesome
  faCoffee = faCoffee
  faPen = faPen

  //Atriobutos de la logica del componente 
  subscriberVariants!: Subscription
  susbscriberDeleteVariants!: Subscription
  public VariantsList$ = new BehaviorSubject<any>([]);
  private httpVariants = inject(HttpVariants);

  //Hook: saber cuando se inicializa el componente
  ngOnInit() {
    this.loadVariants();
  }

  ngOnDestroy() {
    if (this.subscriberVariants) {
      this.subscriberVariants.unsubscribe
    }

    if (this.susbscriberDeleteVariants) {
      this.susbscriberDeleteVariants.unsubscribe
    }
  }

  private loadVariants() {
    // Realizar la petición de los datos de API para que sean obtenidos antes que el componente cargue (visualmente)
    //Guarda la subscripcion al observable para tener control del mismo
    this.subscriberVariants = this.httpVariants.getVariants().subscribe({
      next: (data) => {
        console.log(data);
        //Asignar la lista de productos al observable
        this.VariantsList$.next(data.data) //solo la lista de los productos
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('lista variantes')
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
        this.susbscriberDeleteVariants = this.httpVariants.deleteVariantsById(id).subscribe({
          next: (data) => {
            console.log(data);
            this.loadVariants();      // Ejecutar
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Peticion al API para eliminar variantes por ID');
          }
        });
      }

    });
  }
}



