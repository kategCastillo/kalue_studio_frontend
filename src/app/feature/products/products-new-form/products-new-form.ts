import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpMaterials } from '../../../core/services/http-materials';
import { HttpCategorys } from '../../../core/services/http-categorys';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpProducts } from '../../../core/services/http-products';

@Component({
  selector: 'app-products-new-form',
  imports: [ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './products-new-form.html',
  styleUrl: './products-new-form.css',
})
export default class ProductsNewForm {
  formData: FormGroup;
  private httpMaterials = inject (HttpMaterials)
  private httpCategory = inject (HttpCategorys)
  private httpProducts = inject (HttpProducts)

  materialList$ = new BehaviorSubject <any[]>([]);
  categoryList$ = new BehaviorSubject <any[]>([]);


  constructor(){
    this.formData = new FormGroup ({
      name: new FormControl('', [Validators.required, Validators.minLength (2), Validators.maxLength (50)]),
      description: new FormControl(),
      stock: new FormControl(1, [Validators.min(1)]),
      price: new FormControl(0, [Validators.required, Validators.min (0)]),
      material: new FormControl('Cuero', ),
      category: new FormControl('',[Validators.required] ),
      imagen: new FormControl (),
      isFeatured: new FormControl (true),
      isActive: new FormControl (true)



    });
  }

  onSubmit() {
    
    //verificar si el formulario es valido
    if (this.formData.valid) {
      this.httpProducts.createProduct(this.formData.value).subscribe({
        next: (res) => {
          console.log (res)
        },
        error: (error) => {
          console.error(error)
        },
        complete: () => {}
      })

         //muestro los valores 
    console.log (this.formData.value);
    }
  
  }

  ngOnInit () { 
    this.httpMaterials.getMaterials ().subscribe ({
      next: (data) => {
        console.log (data) 
        this.materialList$.next(data.data)
        
      },
      error: (error) => {
        console.error (error)
      },
      complete: () => {}
    })

    this.httpCategory.getCategorys (). subscribe({
      next: (data) => {
        console.log (data)
        this.categoryList$.next(data.data)
      },
      error: (error) => {
        console.error (error)
      },
      complete: () => {}
    })
  } 
}
