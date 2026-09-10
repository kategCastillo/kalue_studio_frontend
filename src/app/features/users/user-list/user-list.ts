import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, JsonPipe, SlicePipe } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { HttpUsers } from '../../../core/services/http-users';

import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, RouterLink, SlicePipe, DatePipe, FontAwesomeModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export default class UserList {
  private subscriberUser!: Subscription;
  private subscriberDeleteUser!: Subscription;
  private httpUsers = inject(HttpUsers);
  public userList$ = new BehaviorSubject<any>([]);

  serverHostUrl: string = environment.serverHostUrl;

  //Atrivutos de fontAwesome
  public faEdit = faEdit
  public faTrash = faTrash
  public faUserPlus = faUserPlus

  onEdit(id: string) {
    console.log('edit', id);
  }

  onDelete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El éxito se muestra solo cuando el backend confirma la eliminación
        // (antes se mostraba el Swal de éxito antes de llamar al servicio).
        this.subscriberDeleteUser = this.httpUsers.deleteUser(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: 'Eliminado',
              text: res?.msg || 'El usuario fue eliminado.',
              icon: 'success',
            });
            this.loadUsers();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: error?.error?.msg || 'No se pudo eliminar el usuario.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  private loadUsers() {
    this.subscriberUser = this.httpUsers.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.userList$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  /**
   * Construye la URL pública del avatar, garantizando siempre un único "/"
   * entre el host del backend y el path del archivo (evita URLs pegadas
   * como "http://localhost:3001uploads/..." cuando serverHostUrl no
   * termina en slash).
   */
  getImageUrl(urlPath: string | undefined | null): string {
    const host = this.serverHostUrl.endsWith('/')
      ? this.serverHostUrl.slice(0, -1)
      : this.serverHostUrl;

    const path = urlPath || 'uploads/avatars/default-avatar.png';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${host}${cleanPath}`;
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    if (this.subscriberUser) {
      this.subscriberUser.unsubscribe();
    }

    if (this.subscriberDeleteUser) {
      this.subscriberDeleteUser.unsubscribe();
    }
  }
}