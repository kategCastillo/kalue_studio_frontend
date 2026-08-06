import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpMaterials } from '../../../core/services/http-materials';
import { HttpCategorys } from '../../../core/services/http-categorys';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpProducts } from '../../../core/services/http-products';

@Component({
  selector: 'app-products-new-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './products-new-form.html',
  styleUrl: './products-new-form.css',
})
export default class ProductsNewForm {
 public formData: FormGroup;
  private httpCategories = inject(HttpCategorys);
  categoryList$ = new BehaviorSubject<any[]>([]);
  private httpMaterials = inject(HttpMaterials);
  materialList$ = new BehaviorSubject<any[]>([]);
  private httpProduct = inject(HttpProducts);

  constructor() {
    this.formData = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        description: new FormControl('', [
          Validators.maxLength(300),
        ]),
        category: new FormControl('', [Validators.required]),
        material: new FormControl('', [Validators.required]),
        price: new FormControl(0, [
          Validators.required,
          Validators.min(0),
        ]),
        stock: new FormControl(1, [Validators.min(0)]),
        images: new FormControl('', [Validators.required]),
        isFeatured: new FormControl(false),
        isActive: new FormControl(true),
      },
    );
  }

  onSend() {
    //verifica si el campo es valido
    if (this.formData.valid) {
      //Muestro los valores que capturo el formulario
      console.log(this.formData.value);
      this.httpProduct.createProduct(this.formData.value).subscribe({
        next: (res) => {
          console.log(res);
          this.formData.reset();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete execute');
        },
      });
    } else {
      console.log('formulario invalido');
    }
  }

  ngOnInit() {
    this.httpCategories.getCategorys().subscribe({
      next: (categories) => {
        console.log(categories);
        this.categoryList$.next(categories.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete execute');
      },
    });

    this.httpMaterials.getMaterials().subscribe({
      next: (materials) => {
        console.log(materials);
        this.materialList$.next(materials.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete execute');
      },
    });
  }
}
