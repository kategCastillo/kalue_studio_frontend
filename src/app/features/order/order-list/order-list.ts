import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { HttpOrderTs } from '../../../core/services/http-order';
import { BehaviorSubject, Subscription } from 'rxjs';


import Swal from 'sweetalert2'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-Order-list',
  imports: [FontAwesomeModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export default class OrderList {

}



