import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.scss']
})
export class ShowStudentsComponent {
  @ViewChild('content') content!: ElementRef; 
  token!: any;
  err!: any;
  collegeId!: any;
  deplomsData!: any;
  applicationsData!: any;
  programIndex=''
  constructor(private employeeService:EmployeeService,private  http:HttpClient,private authService:AuthService,private router:Router,private CookieService:CookieService, private route: ActivatedRoute){}
 
  ngOnInit(): void {
  
    this.collegeId = localStorage.getItem('collegeId')
    this.token =this.authService.user.value.token
    this.showapplications(this.programIndex)
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

  showapplications(programIndex:any){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    
    const programsId =  this.route.snapshot.paramMap.get('id')
    console.log(this.collegeId,programsId)
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs/${programsId}/applications?applicationStatusFilter=${programIndex}`, {headers}).subscribe(data=>{
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




  onfilterSelectionChange(programIndex:any)
  {

    console.log(programIndex)
    this.showapplications(programIndex)
  
  }

  public SavePDF(): void {
    const content = this.content.nativeElement;

    // Use html2canvas to capture the content as an image
    html2canvas(content).then((canvas) => {
      // Create a new jsPDF instance
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate the height of the content in PDF units (mm)
      const pdfHeight = (canvas.height * 210) / canvas.width;

      // Add the image to the PDF
      doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, 210, pdfHeight);

      // Save the PDF with a specified name
      doc.save('test.pdf');
    });
  }


}
