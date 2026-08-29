import { Component } from '@angular/core';

@Component({
  selector: 'app-resume-dashboard',
  imports: [],
  templateUrl: './resume-dashboard.html',
  styleUrl: './resume-dashboard.css',
})
export default class ResumeDashboard {
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
