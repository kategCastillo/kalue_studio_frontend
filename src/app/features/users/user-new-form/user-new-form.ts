import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-new-form.html',
  styleUrl: './user-new-form.css',
})
export default class UserNewForm {
  public formData: FormGroup;

  constructor(){
    this.formData = new FormGroup({
      name: new FormControl( '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      nickname: new FormControl( '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [Validators.required]),
      role: new FormControl( '', [Validators.required]),
      status: new FormControl( true ),
      avatar: new FormControl( '' )
    });
  }

  onSend() {
    //verifica si el campo es valido
    if(this.formData.valid) {
      //Muestro los valores que capturo el formulario
      console.log(this.formData.value);
    }else{
      console.log('formulario invalido');
    }

  }
}
