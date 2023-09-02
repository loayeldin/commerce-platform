import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin-program',
  templateUrl: './admin-program.component.html',
  styleUrls: ['./admin-program.component.scss']
})
export class AdminProgramComponent {

  constructor(private http:HttpClient,private authService:AuthService){}
  addDiploma = new FormGroup({
    'diplomaName': new FormControl()
  })

  collegesLoad = false
  programsData!:any
  collegeId!:any
  adminProfile!:any
  userRole= this.authService.user.value.role

  token = this.authService.user.value.token

  ngOnInit()
  {
    this.getCollegeId()
   
 
  }


 getCollegeId()
 {
 
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/me`,{headers}).subscribe(data=>
    {
    
      this.adminProfile = data
      this.collegeId = this.adminProfile.data.adminData.collage_id
      console.log(this.collegeId)
      this.showPrograms()
     
    },
    err=>
    {
      console.log(err)
    })

  
 }

  showPrograms()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs`,{headers}).subscribe(data=>
    {
     
      this.programsData = data
     
    },
    err=>
    {
      console.log(err)
    })
  }


onSubmit()
{
  console.log(this.addDiploma.value)
}
}
