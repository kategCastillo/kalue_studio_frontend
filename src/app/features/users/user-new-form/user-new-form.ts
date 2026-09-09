import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpRoles } from '../../../core/services/http-roles';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpUsers } from '../../../core/services/http-users';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

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

  serverHostUrl: string = environment.serverHostUrl;

  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // preview local del archivo elegido

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
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      comfirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      status: new FormControl(true),
    });
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

  /** URL a mostrar en el <img> de preview: el archivo recién elegido, o el default del backend. */
  get avatarPreviewUrl(): string {
    if (this.selectedFilePreview) {
      return this.selectedFilePreview;
    }
    return this.buildAvatarUrl(this.defaultAvatarPath);
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

  onSend() {
    if (this.formData.valid) {
      // Se excluye comfirmPassword (nombre real del control) para no
      // enviarlo al backend; el nombre anterior "confirmPassword" no
      // coincidía con ningún control, así que nunca se filtraba.
      const { comfirmPassword, ...userPayload } = this.formData.value;

      const payload = new FormData();

      Object.entries(userPayload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, typeof value === 'boolean' ? String(value) : (value as any));
        }
      });

      if (this.selectedFile) {
        payload.set('avatar', this.selectedFile);
      }

      this.httpUser.createUser(payload).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Creado',
            text: res?.msg || 'El usuario se creó con éxito.',
            icon: 'success',
          });
          this.formData.reset();
          this.selectedFile = null;
          this.selectedFilePreview = null;
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: error?.error?.msg || 'No se pudo crear el usuario.',
            icon: 'error',
          });
        },
      });
    } else {
      console.log(this.formData.value);
      this.formData.markAllAsTouched();
      return;
    }
  }
}