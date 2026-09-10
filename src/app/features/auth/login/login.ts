import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpAuth } from '../../../core/services/http-auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  public formData: FormGroup;
  private httpAuth = inject(HttpAuth);

  constructor() {
    this.formData = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    this.httpAuth.loginUser(this.formData.value).subscribe({
      next: (res: any) => {
        // loginUser() en http-auth.ts ya viene mapeado a solo el "msg" del
        // backend (.pipe(map((data) => data.msg))), por eso aquí "res" es
        // directamente el texto y no un objeto { data, msg }.
        Swal.fire({ title: 'Inicio exitoso!', text: res, icon: 'success', draggable: true });
        this.formData.reset();
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error?.msg
        });

        
      },
      complete: () => {},
    });
  }
}