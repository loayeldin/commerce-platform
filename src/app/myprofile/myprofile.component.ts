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
   userRole= this.authService.user.value.role
profileLoaded=false
profileMasterData!:any
profileAdminData!:any

  
   ngOnInit()
   {
    this.getMyProfile()
   }

  getMyProfile()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/${this.userRole}/me`,{headers}).subscribe(data=>
    {
      console.log(data)
     if(this.userRole == 'master')
     {

      this.profileAdminData =undefined
      this.profileMasterData = data
      this.profileLoaded=true
     }else if (this.userRole =='admin')
     {
      this.profileAdminData = data
      this.profileMasterData = undefined
      this.profileLoaded=true
     }
     
    },
    err=>
    {
      console.log(err)
    })

  }
}
