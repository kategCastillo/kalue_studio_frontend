import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit, faCubesStacked } from '@fortawesome/free-solid-svg-icons';

import { HttpMaterials } from '../../../core/services/http-materials';

import Swal from 'sweetalert2';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
@Component({
  selector: 'app-material-list',
  imports: [AsyncPipe, RouterLink, DatePipe, FontAwesomeModule, Sidebar],
  templateUrl: './material-list.html',
  styleUrl: './material-list.css',
})
export default class MaterialList {
  private subscriberMaterials!: Subscription;
  private subscriberDeleteMaterial!: Subscription;
  private httpMaterials = inject(HttpMaterials);
  public materialList$ = new BehaviorSubject<any>([]);

  // Atributos de fontAwesome
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faCubesStacked = faCubesStacked;

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
        this.subscriberDeleteMaterial = this.httpMaterials.deleteMaterial(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El material fue eliminado.',
              icon: 'success',
            });
            this.loadMaterials();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el material.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  private loadMaterials() {
    this.subscriberMaterials = this.httpMaterials.getMaterials().subscribe({
      next: (data) => {
        this.materialList$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.loadMaterials();
  }

  ngOnDestroy() {
    if (this.subscriberMaterials) {
      this.subscriberMaterials.unsubscribe();
    }

    if (this.subscriberDeleteMaterial) {
      this.subscriberDeleteMaterial.unsubscribe();
    }
  }
}
