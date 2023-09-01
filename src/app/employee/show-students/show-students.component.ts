import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.scss']
})
export class ShowStudentsComponent {

  applicantStudents!:any

  constructor(private employeeService:EmployeeService, private router:Router){}


  ngOnInit()
  {
    this.applicantStudents =this.employeeService.applicantsStudents
    console.log(this.applicantStudents)
  }



  /** to get stdent info when employee clicked * */
  studentInfo(index:number)
  {
    console.log(this.applicantStudents[index]) 
    let studentId=this.applicantStudents[index].id
    this.router.navigate(['/employee/showStudents', studentId]);
  }

}
