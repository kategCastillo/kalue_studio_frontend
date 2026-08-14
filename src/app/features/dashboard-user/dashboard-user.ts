import { Component, inject } from '@angular/core';
import { HttpUsers } from '../../core/services/http-users';
import { HttpAuth } from '../../core/services/http-auth';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-user',
  imports: [AsyncPipe, DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
})
export default class DashboardUser {
  private httpUsers = inject(HttpUsers);
  public httpAuth = inject(HttpAuth);

  public user$ = new BehaviorSubject<any>(null);

  // Controla si el panel de "Información Personal" está en modo edición o solo lectura.
  public isEditing = false;
  public isSaving = false;

  public formData: FormGroup = new FormGroup({
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
    password: new FormControl('', [Validators.minLength(8)]),
    confirmPassword: new FormControl(''),
  });

  loadUser() {
    this.httpUsers.getUserByIdPublic().subscribe({
      next: (res) => {
        this.user$.next(res.data);
        this.patchForm(res.data);
      },
      error: (error) => console.error(error),
      complete: () => {},
    });
  }

  private patchForm(user: any) {
    this.formData.patchValue({
      name: user?.name || '',
      nickname: user?.nickname || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    });
  }

  // Iniciales del nombre para el avatar cuando el usuario no tiene foto cargada
  getInitials(name?: string): string {
    if (!name) return 'U';

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  enableEdit(): void {
    this.patchForm(this.user$.getValue());
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.patchForm(this.user$.getValue());
    this.isEditing = false;
  }

  onSave(): void {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    const { password, confirmPassword } = this.formData.value;

    // La contraseña es opcional: solo se envía si el usuario escribió una nueva.
    if (password && password !== confirmPassword) {
      Swal.fire({
        title: 'Las contraseñas no coinciden',
        text: 'Verifica que ambos campos de contraseña sean iguales.',
        icon: 'warning',
      });
      return;
    }

    const payload: any = {
      name: this.formData.value.name,
      nickname: this.formData.value.nickname,
      email: this.formData.value.email,
    };

    if (password) {
      payload.password = password;
    }

    this.isSaving = true;

    this.httpUsers.updateUserSelf(payload).subscribe({
      next: (res) => {
        this.isSaving = false;
        this.isEditing = false;
        this.user$.next(res.data);
        this.patchForm(res.data);

        Swal.fire({
          title: 'Datos actualizados',
          text: 'Tu información se guardó exitosamente.',
          icon: 'success',
        });
      },
      error: (error) => {
        this.isSaving = false;
        console.error(error);

        Swal.fire({
          title: 'No se pudo guardar',
          text: error?.error?.msg || 'Ocurrió un error al actualizar tus datos.',
          icon: 'error',
        });
      },
    });
  }

  logout(): void {
    this.httpAuth.logoutUser();
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

  get confirmPassword() {
    return this.formData.get('confirmPassword');
  }

  ngOnInit() {
    this.loadUser();
  }
}