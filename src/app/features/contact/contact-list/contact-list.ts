import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, SlicePipe } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

import { HttpContacts } from '../../../core/services/http-contacts';

import Swal from 'sweetalert2';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
@Component({
  selector: 'app-contact-list',
  imports: [AsyncPipe, RouterLink, SlicePipe, DatePipe, FontAwesomeModule, Sidebar],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export default class ContactList {
  private subscriberContacts!: Subscription;
  private subscriberDeleteContact!: Subscription;
  private httpContacts = inject(HttpContacts);
  public contactList$ = new BehaviorSubject<any>([]);

  // Atributos de fontAwesome
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faMapMarkerAlt = faMapMarkerAlt;
  public faStar = faStar;

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
        this.subscriberDeleteContact = this.httpContacts.deleteContact(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El contacto fue eliminado.',
              icon: 'success',
            });
            this.loadContacts();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el contacto.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  private loadContacts() {
    this.subscriberContacts = this.httpContacts.getContacts().subscribe({
      next: (data) => {
        this.contactList$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.loadContacts();
  }

  ngOnDestroy() {
    if (this.subscriberContacts) {
      this.subscriberContacts.unsubscribe();
    }

    if (this.subscriberDeleteContact) {
      this.subscriberDeleteContact.unsubscribe();
    }
  }
}
