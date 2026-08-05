import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

import { HttpContacts } from '../../../core/services/http-contacts';
import { HttpUsers } from '../../../core/services/http-users';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { HttpAuth } from '../../../core/services/http-auth';
@Component({
  selector: 'app-contact-edit-form',
  imports: [ReactiveFormsModule, RouterLink, Sidebar],
  templateUrl: './contact-edit-form.html',
  styleUrl: './contact-edit-form.css',
})
export default class ContactEditForm {
  public formData: FormGroup;

  private httpContacts = inject(HttpContacts);
  private httpUsers = inject(HttpUsers);
  private activatedRoute = inject(ActivatedRoute);

  private selectedId!: string | null;
  private httpAuth = inject(HttpAuth);

  public userList$ = new BehaviorSubject<any[]>([]);

  // Cuando el formulario se abre desde el perfil del cliente (no desde el
  // listado del administrador) el dueño del contacto no se puede reasignar.
  public lockUser = false;

  constructor() {
    this.formData = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      label: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      receiverName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[+0-9\s-]+$/)]),
      isDefault: new FormControl(false),
    });
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

  private getContact() {
    this.httpContacts.getContactById(this.selectedId).subscribe({
      next: (res) => {
        const { userId, label, receiverName, address, phone, isDefault } = res.data;

        this.formData.patchValue({
          userId: typeof userId === 'object' ? userId?._id : userId,
          label,
          receiverName,
          address,
          phone,
          isDefault,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.selectedId = this.activatedRoute.snapshot.paramMap.get('id');
    this.lockUser = this.activatedRoute.snapshot.data['lockUser'] === true;

    this.loadUsers();
    this.getContact();
  }

  onSend() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Puedes volver a editar este contacto más tarde.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.formData.get('userId')?.patchValue({ userId: this.httpAuth.user._id });
        this.httpContacts
          .updateContactById(this.selectedId as string, this.formData.value)
          .subscribe({
            next: () => {
              Swal.fire({
                title: 'Actualizado',
                text: 'El contacto se actualizó con éxito.',
                icon: 'success',
              });
            },
            error: (error) => {
              console.error(error);
              Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el contacto.',
                icon: 'error',
              });
            },
          });
      }
    });
  }
}
