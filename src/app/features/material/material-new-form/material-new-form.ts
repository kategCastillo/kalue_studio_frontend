import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { HttpMaterials } from '../../../core/services/http-materials';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
@Component({
  selector: 'app-material-new-form',
  imports: [ReactiveFormsModule, RouterLink, Sidebar],
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
      next: (res) => {
        console.log(res);
        this.formData.reset({ isActive: true });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
