import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {
  public formData: FormGroup;

  constructor (){
    this.formData = new FormGroup ({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      label: new FormControl ('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      receiverName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [Validators.required])
    });
  }

  onSend(){
    if(this.formData.valid){
      console.log(this.formData.value);
    }else{
      console.log('formulario invalido');
    }
  }

  registerWithGoogle(){

  }

  registerWithapple(){
    
  }

}
