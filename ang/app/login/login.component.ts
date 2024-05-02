import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { FormsModule,FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router : Router){

  }

  user_records: any[] = [];

  data={  
    email:"",
    password:""
  }

  Login(Values:any){

    this.user_records = JSON.parse(localStorage.getItem('users')|| "{}");

    if(this.user_records.some((v)=>{
      return v.email == this.data.email && v.password == this.data.password
    })){
      alert('Login Successful!');
      this.router.navigate(['/user']);
    }else{
      alert('Login Failed!');
    }
  }
}
