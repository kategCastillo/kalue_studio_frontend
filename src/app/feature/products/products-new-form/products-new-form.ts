import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
      name: new FormControl(),
      description: new FormControl(),
      stock: new FormControl(),
      price: new FormControl(),
      material: new FormControl(),
      category: new FormControl(),



    });
  }

  onSubmit() {
    //muestro los valores 
    console.log (this.formData.value);
  }
}
