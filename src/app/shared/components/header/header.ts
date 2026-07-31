import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpAuth } from '../../../core/services/http-auth';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public httpAuth = inject (HttpAuth);

  logout(): void {
    this.httpAuth.logoutUser(); 
  }
}
