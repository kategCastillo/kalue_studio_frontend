import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../../core/services/http-products';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {

  private httpProducts = inject(HttpProducts);

  ngOnInit(){
    this.httpProducts.getUsers().subscribe({
      next: ( data ) => {
        console.log(data); 
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
