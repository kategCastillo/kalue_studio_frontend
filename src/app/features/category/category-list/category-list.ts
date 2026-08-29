import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import { HttpCategories } from '../../../core/services/http-categories';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  imports: [AsyncPipe, RouterLink, DatePipe, FontAwesomeModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export default class CategoryList {
  private subscriberCategories!: Subscription;
  private subscriberDeleteCategory!: Subscription;
  private httpCategories = inject(HttpCategories);
  public categoryList$ = new BehaviorSubject<any>([]);

  // Atributos de fontAwesome
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faFolderPlus = faFolderPlus;

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
        this.subscriberDeleteCategory = this.httpCategories.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminada',
              text: 'La categoría fue eliminada.',
              icon: 'success',
            });
            this.loadCategories();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la categoría.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  private loadCategories() {
    this.subscriberCategories = this.httpCategories.getCategories().subscribe({
      next: (data) => {
        this.categoryList$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  ngOnDestroy() {
    if (this.subscriberCategories) {
      this.subscriberCategories.unsubscribe();
    }

    if (this.subscriberDeleteCategory) {
      this.subscriberDeleteCategory.unsubscribe();
    }
  }
}
