import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide=true;
  signupForm!: FormGroup;
  constructor(private _auth:AuthService, private _router: Router) { }
  
  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name:new FormControl('',Validators.required),
        lastname:new FormControl('',Validators.required),
        email: new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.minLength(6)])
      }
    )
  }

  onSignup(){
    
    if (!this.signupForm?.get('email')?.errors && !this.signupForm?.get('password')?.errors && !this.signupForm?.get('name')?.errors && !this.signupForm?.get('lastname')?.errors)  {
      this._auth.registerUser(this.signupForm.value)
        .subscribe(
          res => { 
            console.log(res),
            sessionStorage.setItem('LoggedInUser' ,JSON.stringify(res)),
            this._router.navigate(['/shopFront'])
          } ,
          err => console.log(err),
        )
      
    }
    
  }

}
