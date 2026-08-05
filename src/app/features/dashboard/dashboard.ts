import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard {
  // TODO: reemplazar con datos reales desde los servicios http-users, http-categories,
  // http-materials y http-contacts (por ejemplo con un forkJoin en el constructor/ngOnInit).
  stats = {
    users: 0,
    categories: 0,
    materials: 0,
    contacts: 0,
  };

  recentActivity: { text: string; time: string }[] = [];
}