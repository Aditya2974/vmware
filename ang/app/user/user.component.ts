import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  user_records: any[] = [];

  data={
    name:"",
    email:"",
    password:"",
    Course:""
  }

  constructor(){
    this.user_records = JSON.parse(localStorage.getItem('users')|| "{}");
  }

}
