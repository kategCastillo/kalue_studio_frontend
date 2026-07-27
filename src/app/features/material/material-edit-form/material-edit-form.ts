import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { HttpMaterials } from '../../../core/services/http-materials';

@Component({
  selector: 'app-material-edit-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './material-edit-form.html',
  styleUrl: './material-edit-form.css',
})
export default class MaterialEditForm {
  public formData: FormGroup;

  private httpMaterials = inject(HttpMaterials);
  private activatedRoute = inject(ActivatedRoute);

  private selectedId!: string | null;

  constructor() {
    this.formData = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [Validators.maxLength(200)]),
      isActive: new FormControl(true),
    });
  }

  private getMaterial() {
    this.httpMaterials.getMaterialById(this.selectedId).subscribe({
      next: (res) => {
        const { name, description, isActive } = res.data;

        this.formData.patchValue({
          name,
          description,
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
    this.getMaterial();
  }

  onSend() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Puedes volver a editar este material más tarde.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpMaterials.updateMaterialById(this.selectedId as string, this.formData.value).subscribe({
          next: () => {
            Swal.fire({
              title: 'Actualizado',
              text: 'El material se actualizó con éxito.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el material.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
