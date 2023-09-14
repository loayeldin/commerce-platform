import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-student-req-data',
  templateUrl: './student-req-data.component.html',
  styleUrls: ['./student-req-data.component.scss']
})
export class StudentReqDataComponent {
  token!: any;
  err!: any;
  collegeId!: any;
 
  applicationData!: any;
  constructor(private  http:HttpClient,private authService:AuthService,private router:Router,private CookieService:CookieService, private route: ActivatedRoute){}
 
  ngOnInit(): void {
    this.authService.getCookies()
    this.collegeId = this.CookieService.get('collegeId')
    this.token =this.authService.user.value.token
    this.showapplication()
    
     
   }


  showapplication(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    const appId =  this.route.snapshot.paramMap.get('studentId')
    console.log(appId);
    
    const programsId =  this.route.snapshot.paramMap.get('id')
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs/${programsId}/applications/${appId}`, {headers}).subscribe(data=>{
      console.log(data);
      
      this.applicationData = data
      this.err = undefined
    },
    err=>{
      if(err.error.message=='No deploms found')
      {
        this.err = err.error.message
        this.applicationData = undefined
        console.log(this.err)
      }else
      {
        console.log(this.err.error.message)
      }
    
    }
    )
  }
}
