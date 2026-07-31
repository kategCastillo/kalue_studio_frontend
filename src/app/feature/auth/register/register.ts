import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {

  public FormData: FormGroup

  constructor(){
    this.FormData = new FormGroup ({
      name: new FormControl ('', []),
      email: new FormControl ('', []),
      password: new FormControl ('', []),
      
    })
  }

  onSubmit(){
    console.log(this.FormData.value)
  }
}
