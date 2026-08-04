import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { HttpAuth } from '../../../core/services/http-auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public httpAuth = inject(HttpAuth);

  logout(): void {
    this.httpAuth.logoutUser();
  }

}
