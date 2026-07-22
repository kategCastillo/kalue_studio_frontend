import { Component, inject } from '@angular/core';
import { HttpUsers } from '../../../core/services/http-users';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AsyncPipe, DatePipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, RouterLink, SlicePipe, DatePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export default class UserList {
  private subscriberUser!: Subscription;
  private subscriberDeleteUser!: Subscription;
  private httpUsers = inject(HttpUsers);
  public userList$ = new BehaviorSubject<any>([]);

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
