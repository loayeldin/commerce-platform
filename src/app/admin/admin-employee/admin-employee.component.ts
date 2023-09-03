import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.scss']
})
export class AdminEmployeeComponent implements OnInit{
  constructor(private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute,private CookieService:CookieService){}
  ngOnInit(): void {
    
    this.getCollegeId()
    
  }
  token =this.authService.user.value.token
  addEmployee = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',Validators.compose([Validators.required , Validators.email])),
    password: new FormControl('',Validators.required),
  })
  
  employeeData!:any
  isLoading= false
  collegeId!:any
  adminProfile!:any
  
  err!:any

  getCollegeId()
  {
  
     const headers= new HttpHeaders({
       'Authorization': `Bearer ${this.token}`
     })
     
     return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/me`,{headers}).subscribe(data=>
     {
       this.CookieService.delete('collegeId');
       this.adminProfile = data
       this.collegeId = this.adminProfile.data.adminData.collage_id
       this.CookieService.set('collegeId',this.collegeId) // put college id in cookies to use it in admin program details
      
      
     },
     err=>
     {
       console.log(err)
     })
 
   
  }
 

  createEmployee(value:any){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`

    })

   
    this.collegeId = this.adminProfile.data.adminData.collage_id
      
    
    
    return this.http.post(`https://commerce-api-dev.onrender.com/api/v1/collages/${this.collegeId}/employees`,value, {headers}).subscribe(data=>{
      console.log(data);
      $('#addEmployee').modal('hide')
      this.showEmployee()
    },
    err=>{
      this.err = err.error.message
      this.isLoading= true
    }
    
    )
  }
  showEmployee(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`

    })
    

    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees`,{headers}).subscribe(data=>{
    
    
    this.employeeData = data
    console.log(data);
    
    })
  }


  onSubmit(){
    console.log(this.addEmployee.value);
    // this.createEmployee(this.addEmployee.value)
    
  }
}
