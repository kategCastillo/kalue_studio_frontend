import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './products-new-form.html',
  styleUrl: './products-new-form.css',
})
export default class ProductsNewForm {
  formData: FormGroup;

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
    console.group ('Estados del campo ');
    console.log ('valid (formData)', this.formData.valid);
    console.log ('valid (name)', this.formData.get ('name')?.valid);
    console.groupEnd;


//verificar si el formulario es valido
    if (this.formData.valid) {

         //muestro los valores 
    console.log (this.formData.value);
    }
  
  }
}
