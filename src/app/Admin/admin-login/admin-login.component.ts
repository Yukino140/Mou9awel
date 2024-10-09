import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule, FormGroup, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent  {

  loginForm:FormGroup=new FormGroup({
    'username':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required)
  });
  submitted = false;


  constructor(private router : Router){}

  

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get username():string{
    return this.loginForm.get('username')?.value

  }

  get password():string{
    return this.loginForm.get('password')?.value
  }

  onSubmit(): void {
    /*this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Handle the login logic (API call or redirection)
    console.log('Login successful', this.loginForm.value);*/

    if((this.username=="admin")&&(this.password=="admin")){
      console.log('Logged IN')
        this.router.navigate(['/Dashboard'])
    }
  }
}
