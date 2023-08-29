import { Component } from '@angular/core';
import { ApplicantServiceService } from '../applicant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {

  programList:any
  constructor(private appService:ApplicantServiceService , private router:Router){}
  ngOnInit()
  {
    this.programList = this.appService.programList
  }




  showProgramDetails(index:number)
  {
    console.log(index)
    this.router.navigate(['applicant/program-details'])
  }
}
