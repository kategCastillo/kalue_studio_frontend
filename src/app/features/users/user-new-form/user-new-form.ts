import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpRoles } from '../../../core/services/http-roles';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpUsers } from '../../../core/services/http-users';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-new-form',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './user-new-form.html',
  styleUrl: './user-new-form.css',
})
export default class UserNewForm {
  public formData: FormGroup;
  private httpRoles = inject(HttpRoles);
  roleList$ = new BehaviorSubject<any[]>([]);
  private httpUser = inject(HttpUsers);

  constructor() {
    this.formData = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
        ]),
        nickname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20), // ← era 30, el schema dice 20
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8), // ← faltaba, el HTML lo valida
        ]),
        comfirmPassword: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        status: new FormControl(true),
        avatar: new FormControl(''),
      },
    );
  }

  onSend() {
    //verifica si el campo es valido
    if (this.formData.valid) {
      //Muestro los valores que capturo el formulario
      console.log(this.formData.value);
      this.httpUser.createUser(this.formData.value).subscribe({
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
    this.httpRoles.getRoles().subscribe({
      next: (roles) => {
        console.log(roles);
        this.roleList$.next(roles.roles);
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
