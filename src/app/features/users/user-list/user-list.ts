import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, JsonPipe, SlicePipe } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { HttpUsers } from '../../../core/services/http-users';

import Swal from 'sweetalert2';

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
  
  //Atrivutos de fontAwesome
  public faEdit = faEdit
  public faTrash = faTrash
  public faUserPlus = faUserPlus

  onEdit(id: string) {
    console.log('edit', id);
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        this.subscriberDeleteUser = this.httpUsers.deleteUser(id).subscribe({
          next: (data) => {
            console.log(data);
            this.loadUsers();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {}
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
