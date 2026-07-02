import { Component, inject } from '@angular/core';
import { HttpUsers } from '../../../core/services/http-users';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [JsonPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  users: any = {};

  private httpProducts = inject(HttpUsers);

  ngOnInit(){
    this.httpProducts.getUsers().subscribe({
      next: ( data ) => {
        console.log(data); 
        this.users = data;
      },
      error: ( error ) => {
        console.error(error); 
      },
      complete: (  ) => {}
    });
  }

  ngOnDestroy(){

  }
}
