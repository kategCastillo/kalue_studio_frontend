import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-new-form.html',
  styleUrl: './user-new-form.css',
})
export default class UserNewForm {
  formData: FormGroup;

  constructor(){
    this.formData = new FormGroup({
      name: new FormControl(),
      nickname: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl(),
      status: new FormControl(),
      avatar: new FormControl()

    });
  }

  onSend() {
    //Muestro los valores que capturo el formulario
    console.log(this.formData.value);
  }
}
