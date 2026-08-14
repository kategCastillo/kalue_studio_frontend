import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { HttpContacts } from '../../../core/services/http-contacts';
import { HttpUsers } from '../../../core/services/http-users';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { HttpAuth } from '../../../core/services/http-auth';
@Component({
  selector: 'app-contact-new-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact-new-form.html',
  styleUrl: './contact-new-form.css',
})
export default class ContactNewForm {
  public formData: FormGroup;
  private httpAuth = inject(HttpAuth);
  private httpContacts = inject(HttpContacts);
  private httpUsers = inject(HttpUsers);
  private activatedRoute = inject(ActivatedRoute);

  // Lista de usuarios, solo se usa en modo "administrador"
  public userList$ = new BehaviorSubject<any[]>([]);

  // Si la ruta trae :userId, el formulario se usa desde el perfil del cliente
  // y el campo de usuario queda oculto y autocompletado.
  public lockedUserId: string | null = null;

  constructor() {
    console.log()

    this.formData = new FormGroup({
      userId: new FormControl(this.httpAuth.user.name, [Validators.required]),
      label: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      receiverName: new FormControl(this.httpAuth.user.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[+0-9\s-]+$/),
      ]),
      isDefault: new FormControl(false),
    });
  }

  ngOnInit() {
    this.lockedUserId = this.activatedRoute.snapshot.paramMap.get('userId');

    if (this.lockedUserId) {
      // Modo usuario: se fija el dueño del contacto y no se muestra el selector
      this.formData.patchValue({ userId: this.lockedUserId });
    } else {
      // Modo administrador: se debe elegir a qué usuario pertenece el contacto
      this.loadUsers();
    }
  }

  private loadUsers() {
    this.httpUsers.getUsers().subscribe({
      next: (res) => {
        this.userList$.next(res.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSend() {
    if (this.formData.valid) {
      this.formData.get('userId')?.patchValue({userId: this.httpAuth.user._id})
      this.httpContacts.createContact(this.formData.value).subscribe({
        next: (res) => {
          console.log(res);
          const keepUserId = this.formData.get('userId')?.value;
          this.formData.reset({ userId: keepUserId, isDefault: false });
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.formData.markAllAsTouched();
    }
  }
}
