import { Component, inject } from '@angular/core';
import { HttpUsers } from '../../../core/services/http-users';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [JsonPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export default class UserList {
  users: any = {};


  //inyectar una dependencia
  private httpUsers = inject ( HttpUsers)


//hook del ciclo de vida de un componente en Angula (cuando se inicializa el componente)
npOnInit () {
  this.httpUsers.getUsers().subscribe({
    next: (users) => {
      console.log('componente', users);
     // this.users = data; //asignando los datos obtenidos del servicio al  atributo publico para mostrarlo en el HTML componente
    },
    error: (err) => {
      console.error (err);
    },

  });
  }
} 