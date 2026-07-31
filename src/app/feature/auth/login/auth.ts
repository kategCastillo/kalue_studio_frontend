import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { email } from '@angular/forms/signals';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export default class Auth {
  
  public FormData: FormGroup
  private httpAuth = inject (HttpAuth)

  constructor(){
    this.FormData = new FormGroup ({
      user: new FormControl ('', []),
      password: new FormControl ('', [])  
    })  
  }

  onSubmit(){
    console.log(this.FormData.value);

    this.httpAuth.loginUser(this.FormData.value).subscribe ({
      next: (res) => {
        console.log (res);
        this.FormData.reset ()  

      },
             //limpiamos los campos del formulario 
      error: (err) => {
        console.error (err)
      
      }
    })
  }
    //usar el servicio para conectar equivalente del fromulario de HTML

}
