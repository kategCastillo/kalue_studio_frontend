import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

import { HttpCategories } from '../../../core/services/http-categories';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
@Component({
  selector: 'app-category-edit-form',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink, Sidebar],
  templateUrl: './category-edit-form.html',
  styleUrl: './category-edit-form.css',
})
export default class CategoryEditForm {
  public formData: FormGroup;

  private httpCategories = inject(HttpCategories);
  private activatedRoute = inject(ActivatedRoute);

  private selectedId!: string | null;

  // Categorías existentes para elegir la categoría padre (sin incluirse a sí misma)
  public categoryList$ = new BehaviorSubject<any[]>([]);

  constructor() {
    this.formData = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [Validators.maxLength(300)]),
      parentCategoryId: new FormControl(''),
      isActive: new FormControl(true),
    });
  }

  private loadCategories() {
    this.httpCategories.getCategories().subscribe({
      next: (res) => {
        // Una categoría no puede ser su propia categoría padre
        this.categoryList$.next(res.data.filter((c: any) => c._id !== this.selectedId));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private getCategory() {
    this.httpCategories.getCategoryById(this.selectedId).subscribe({
      next: (res) => {
        const { name, description, parentCategoryId, isActive } = res.data;

        this.formData.patchValue({
          name,
          description,
          parentCategoryId: typeof parentCategoryId === 'object' ? parentCategoryId?._id : (parentCategoryId || ''),
          isActive,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.selectedId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadCategories();
    this.getCategory();
  }

  onSend() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Puedes volver a editar esta categoría más tarde.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          ...this.formData.value,
          parentCategoryId: this.formData.value.parentCategoryId || null,
        };

        this.httpCategories.updateCategoryById(this.selectedId as string, payload).subscribe({
          next: () => {
            Swal.fire({
              title: 'Actualizada',
              text: 'La categoría se actualizó con éxito.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar la categoría.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
