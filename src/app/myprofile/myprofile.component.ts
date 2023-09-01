import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent {

  constructor(private authService:AuthService, private http:HttpClient){}
   token = this.authService.user.value.token 
profileLoaded=false
  profileData!:any

  
   ngOnInit()
   {
    this.getMyProfile()
   }

  getMyProfile()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.get('https://commerce-api-dev.onrender.com/api/v1/master/me',{headers}).subscribe(data=>
    {
      console.log(data)
      this.profileData = data
      this.profileLoaded=true
    },
    err=>
    {
      console.log(err)
    })

  }
}
