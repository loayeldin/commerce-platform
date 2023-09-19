import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.scss']
})
export class ShowStudentsComponent {

  token!: any;
  err!: any;
  collegeId!: any;
  deplomsData!: any;
  applicationsData!: any;
  constructor(private employeeService:EmployeeService,private  http:HttpClient,private authService:AuthService,private router:Router,private CookieService:CookieService, private route: ActivatedRoute){}
 
  ngOnInit(): void {
    this.authService.getCookies()
    this.collegeId = this.CookieService.get('collegeId')
    this.token =this.authService.user.value.token
    this.showapplications()
    this.showDeplomsData()
     
   }

   studentInfo(index:number){
    let studentId=this.applicationsData.data.applications[index].id
    const deplomaId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/employee/empHome/${deplomaId}/showStudents/${studentId}`, ]);
   }

  // ngOnInit()
  // {
  //   this.applicantStudents =this.employeeService.applicantsStudents
  //   console.log(this.applicantStudents)
  // }



  /** to get stdent info when employee clicked * */
  // studentInfo(index:number)
  // {
  //   console.log(this.applicantStudents[index]) 
  //   let studentId=this.applicantStudents[index].id
  //   this.router.navigate(['/employee/showStudents', studentId]);
  // }

  showapplications(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    
    const programsId =  this.route.snapshot.paramMap.get('id')
    console.log(this.collegeId,programsId)
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs/${programsId}/applications`, {headers}).subscribe(data=>{
      console.log(data);
      
      this.applicationsData = data
      this.err = undefined
    },
    err=>{
      if(err.error.message=='No deploms found')
      {
        this.err = err.error.message
        this.applicationsData = undefined
        console.log(this.err)
      }else
      {
        console.log(this.err.error.message)
      }
    
    }
    )
  }
  
  showDeplomsData(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    
    const programsId =  this.route.snapshot.paramMap.get('id')
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs/${programsId}`, {headers}).subscribe(data=>{
      
      
      this.deplomsData = data
      this.err = undefined
    },
    err=>{
      if(err.error.message=='No deploms found')
      {
        this.err = err.error.message
        this.deplomsData = undefined
        console.log(this.err)
      }else
      {
        console.log(this.err.error.message)
      }
    
    }
    )
  }
}
