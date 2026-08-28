import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpRoles } from '../../../core/services/http-roles';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpUsers } from '../../../core/services/http-users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit-form',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './user-edit-form.html',
  styleUrl: './user-edit-form.css',
})
export default class UserEditForm {
  private httpRoles = inject(HttpRoles);
  roleList$ = new BehaviorSubject<any[]>([]);
  private activatedRoute = inject(ActivatedRoute);
  private selectedId!: string | undefined | null | any;
  public formData: FormGroup;
  private httpUser = inject(HttpUsers);

  constructor() {
    this.formData = new FormGroup({
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
    });
  }

  private getRols() {
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

  private getUser() {
    this.httpUser.getUserById(this.selectedId).subscribe({
      next: (data) => {
        console.log(data);

        const { name, nickname, email, role, status, avatar } = data.data;

        this.formData.patchValue({
          name,
          nickname,
          email,
          role,
          status,
          avatar,
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  ngOnInit() {
    // obtener el id que se encuentra en la url (solamente cuanco el formulario es un componenete de pagina)
    this.selectedId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRols();
    this.getUser();
  }

  onSend() {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Recuarda que puedes volver a editar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, editar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Editado!',
          text: 'Usuario Actualizado con exito.',
          icon: 'success',
        });

        if (this.formData.valid) {
          this.httpUser.updateUserById(this.selectedId, this.formData.value).subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {},
          });
        } else {
          console.log('Formulario invalido');
        }
      }
    });
  }

  get name() {
    return this.formData.get('name');
  }

  get nickname() {
    return this.formData.get('nickname');
  }

  get email() {
    return this.formData.get('email');
  }

  get password() {
    return this.formData.get('password');
  }

  get comfirmPassword() {
    return this.formData.get('comfirmPassword');
  }

  get role() {
    return this.formData.get('role');
  }

  get avatar() {
    return this.formData.get('avatar');
  }
}
