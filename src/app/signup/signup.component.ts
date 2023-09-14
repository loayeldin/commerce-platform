import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8), // Minimum length of 8 characters
      Validators.maxLength(15), // Maximum length of 15 characters
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/), // Requires at least one letter and one number
    ]),
    national_id: new FormControl('',[Validators.required,  Validators.pattern(/^[0-9]{14}$/)]),
    gender: new FormControl('',[Validators.required])
  })
  constructor(private http:HttpClient ,private router:Router,private CookieService:CookieService,private authService:AuthService){}


  submit()
  
  {
    console.log(this.signUpForm.value)
    this.authService.signUpApplicant(this.signUpForm.value)
  }
}
