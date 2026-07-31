import { Component, inject } from '@angular/core';
import { HttpAuth } from '../../core/services/http-auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard {
  private httpAuth = inject (HttpAuth)

  logout (){
    this.httpAuth.logoutUser();
  }
}
