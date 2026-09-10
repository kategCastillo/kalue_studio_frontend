import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { HttpMaterials } from '../../../core/services/http-materials';

@Component({
  selector: 'app-material-new-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './material-new-form.html',
  styleUrl: './material-new-form.css',
})
export default class MaterialNewForm {
  public formData: FormGroup;

  private httpMaterials = inject(HttpMaterials);

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

  onSend() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    this.httpMaterials.createMaterial(this.formData.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Creado',
          text: res?.msg || 'El material se creó con éxito.',
          icon: 'success',
        });
        this.formData.reset({ isActive: true });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: error?.error?.msg || 'No se pudo crear el material.',
          icon: 'error',
        });
      },
    });
  }
}