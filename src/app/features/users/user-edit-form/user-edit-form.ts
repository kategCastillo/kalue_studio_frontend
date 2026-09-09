import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpRoles } from '../../../core/services/http-roles';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpUsers } from '../../../core/services/http-users';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

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
  serverHostUrl: string = environment.serverHostUrl;

  // --- Avatar state (fuera del FormGroup: no es un campo de texto normal) ---
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // preview local del archivo elegido
  resetAvatarFlag: boolean = false;
  currentAvatarUrl: string | null = null; // ruta ("avatar") que viene del backend

  // Ruta relativa del avatar por defecto tal como vive en el backend
  // (public/uploads/avatars/default-avatar.png, servida vía /uploads/avatars/...)
  readonly defaultAvatarPath = 'uploads/avatars/default-avatar.png';

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
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // Opcional de verdad: sin required. Si escriben algo, debe tener min 8.
      password: new FormControl('', [Validators.minLength(8)]),
      comfirmPassword: new FormControl(''),
      role: new FormControl('', [Validators.required]),
      status: new FormControl(true),
    });
  }

  ngOnInit() {
    this.selectedId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRols();
    this.getUser();
  }

  private getRols() {
    this.httpRoles.getRoles().subscribe({
      next: (roles) => this.roleList$.next(roles.roles),
      error: (error) => console.error(error),
    });
  }

  private getUser() {
    this.httpUser.getUserById(this.selectedId).subscribe({
      next: (data) => {
        const { name, nickname, email, role, status, avatar } = data.data;

        this.formData.patchValue({
          name,
          nickname,
          email,
          role,
          status,
        });

        // "avatar" es el nombre real del campo en el modelo de Mongo.
        // currentAvatarUrl es solo cómo se llama la variable en este componente.
        this.currentAvatarUrl = avatar || null;
      },
      error: (error) => console.error(error),
    });
  }

  /** URL final a mostrar en el <img>: preview local, avatar del server, o el default del server. */
  get avatarPreviewUrl(): string {
    if (this.selectedFilePreview) {
      return this.selectedFilePreview;
    }
    if (this.resetAvatarFlag || !this.currentAvatarUrl) {
      return this.buildAvatarUrl(this.defaultAvatarPath);
    }
    return this.buildAvatarUrl(this.currentAvatarUrl);
  }

  /** Concatena host + path evitando el bug de doble slash / slash faltante. */
  private buildAvatarUrl(path: string): string {
    const host = this.serverHostUrl.endsWith('/')
      ? this.serverHostUrl.slice(0, -1)
      : this.serverHostUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${host}${cleanPath}`;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.resetAvatarFlag = false;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFilePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.selectedFilePreview = null;
    }
  }

  onRemoveAvatar(): void {
    this.selectedFile = null;
    this.selectedFilePreview = null;
    this.resetAvatarFlag = true;
    this.currentAvatarUrl = null;
  }

  onSend() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Recuarda que puedes volver a editar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, editar!',
    }).then((result) => {
      if (!result.isConfirmed) return;

      const { comfirmPassword, ...userPayload } = this.formData.value;

      if (!userPayload.password) {
        delete userPayload.password;
      }

      const payload = new FormData();
      Object.entries(userPayload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value as any);
        }
      });

      if (this.selectedFile) {
        payload.set('avatar', this.selectedFile);
      } else if (this.resetAvatarFlag) {
        payload.set('avatar', '');
      }

      this.httpUser.updateUserById(this.selectedId, payload).subscribe({
        next: (data: any) => {
          Swal.fire({
            title: 'Editado!',
            text: data?.msg || 'Usuario actualizado con éxito.',
            icon: 'success',
          });
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: error?.error?.msg || 'No se pudo actualizar el usuario.',
            icon: 'error',
          });
        },
      });
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
}