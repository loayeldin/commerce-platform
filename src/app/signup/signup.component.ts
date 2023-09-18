import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
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
       // Requires at least one letter and one number
    ]),
    national_id: new FormControl('',[Validators.required,  Validators.pattern(/^[0-9]{16}$/)]),
    gender: new FormControl('',[Validators.required])
  })
  constructor(private http:HttpClient ,private router:Router,private CookieService:CookieService,private authService:AuthService){}


  submit()
  
  {
    console.log(this.signUpForm.value)
    this.authService.signUpApplicant(this.signUpForm.value)
  }
  // passwordMatch(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password')?.value;
  //   const confirmPassword = control.get('confirmPassword')?.value;
  
  //   if (password !== confirmPassword) {
  //     return { passwordMismatch: true };
  //   }
  //   return null;
  // }
  

  // register = new FormGroup({
  //   fullname: new FormControl('' , Validators.required),
  //   nationalId: new FormControl('', Validators.compose([Validators.required, Validators.pattern('/^[0-9]{16}$/')])),
  //   collage : new FormControl('', Validators.required),
  //   email:new FormControl('' , Validators.compose([Validators.required , Validators.email])),
  //   gender:new FormControl('male',Validators.required),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8) // Adjust minimum password length as needed
  //   ]),
  //   confirmPassword: new FormControl('', Validators.required)
  // }, { validators: this.passwordMatch.bind(this)

  // })



  // onSubmit()
  // {
  

  //   console.log(this.register.value) 
      
  //   this.authService.signUpApplicant(this.register.value)
      
      
  // }
}
