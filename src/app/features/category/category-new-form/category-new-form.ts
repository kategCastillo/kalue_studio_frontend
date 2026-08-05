import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { HttpCategories } from '../../../core/services/http-categories';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
@Component({
  selector: 'app-category-new-form',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink, Sidebar],
  templateUrl: './category-new-form.html',
  styleUrl: './category-new-form.css',
})
export default class CategoryNewForm {
  public formData: FormGroup;

  private httpCategories = inject(HttpCategories);

  // Categorías existentes, para elegir una categoría padre (opcional)
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

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.httpCategories.getCategories().subscribe({
      next: (res) => {
        this.categoryList$.next(res.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSend() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    // Si no se elige categoría padre, se envía null (categoría raíz)
    const payload = {
      ...this.formData.value,
      parentCategoryId: this.formData.value.parentCategoryId || null,
    };

    this.httpCategories.createCategory(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.formData.reset({ isActive: true, parentCategoryId: '' });
        this.loadCategories();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
