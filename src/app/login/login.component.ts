import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService:AuthService){}

  login = new FormGroup(
    {
      role: new FormControl('master'),
      email: new FormControl(''),
      password: new FormControl('')
    })

    onSubmit()
    {
      console.log(this.login.value)
      this.authService.login(this.login.value)
    }

}
