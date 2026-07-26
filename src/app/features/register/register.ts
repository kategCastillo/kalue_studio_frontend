import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { HttpRegister } from '../../core/services/http-register';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {
  public formData: FormGroup;
  private httpRegister = inject(HttpRegister);


  constructor (){
    this.formData = new FormGroup ({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      comfirmPassword: new FormControl('', [Validators.required]),
      contacts: new FormGroup({
        label: new FormControl ('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        receiverName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        address: new FormControl('', [Validators.required, Validators.minLength(5)]),
        phone: new FormControl('', [Validators.required]),
        isDefault: new FormControl(true)
      }),
    });
  }

  onSend(){
    if(this.formData.valid){
      console.log(this.formData.value);
      this.httpRegister.register(this.formData.value).subscribe({
        next: (res) => {
          console.log(res);
          this.formData.reset();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {}
        })
    }else{
      console.log('formulario invalido');
    }
  }

  // OAuth de Google
  registerWithGoogle(){

  }

  // OAuth de Apple
  registerWithapple(){
    
  }

}
