import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule,FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(){

  }

  ngOnInit(): void {

  }

  user_records : any[] = [];
  data={
    name:"",
    email:"",
    password:"",
    Course:""
  }

  Register(Values:any){
    // alert('Submitted Successfully')
    this.user_records = JSON.parse(localStorage.getItem('users')|| "{}");  

    if(this.user_records.some((v)=>{
      return v.email == this.data.email 
    })){
      alert('Duplicate Data found')
    }else{
      this.user_records.push(this.data);
      localStorage.setItem('users',JSON.stringify(this.user_records));
      alert('Hi'+this.data.name + " you have successfully registered"); 
    }
  }
}
