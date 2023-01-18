import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { Router, RouteReuseStrategy } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  hide = true;
  constructor(private _auth: AuthService,private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.minLength(8)])

      }
    )

  }

  admin(){
    if (this._auth.isAdmin()) {
      this._router.navigate(['/admin'])
    }
    else{
      this._router.navigate(['/shopFront'])
    }
  }

  onLogin(){

    if (!this.loginForm?.get('email')?.errors && !this.loginForm?.get('password')?.errors && !this.loginForm?.get('name')?.errors && !this.loginForm?.get('lastname')?.errors)  {
        this._auth.loginUser(this.loginForm.value)
          .subscribe(
            res => { 
                      console.log(res),
                      sessionStorage.setItem('LoggedInUser' ,JSON.stringify(res)),
                      this.admin()
                    } ,
            err => console.log(err)
          ) 
    }


  }

}

