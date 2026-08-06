import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-contacto',
  imports: [FontAwesomeModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export default class Contacto {
  public faArrow = faArrowAltCircleLeft
}
