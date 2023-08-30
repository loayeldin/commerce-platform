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
  filteredProgramList:any
  constructor(private appService:ApplicantServiceService , private router:Router){}
  ngOnInit()
  {
    this.programList = this.appService.programList
    this.filteredProgramList = [...this.programList];
  }




  showProgramDetails(index:number)
  {
    console.log(index)
    this.router.navigate(['applicant/program-details'])
  }

  searchProgram(value: any) {

   
 
    let objectAsString = value.value.toString();



    if (typeof objectAsString === 'string') {
      objectAsString = objectAsString.toLowerCase();

     
        this.filteredProgramList = this.programList.filter((program: string) =>
            program.toLowerCase().includes(objectAsString)
        );
      console.log(this.filteredProgramList)
    
    }
}

  // searchProgram(value:any)
  // {
   
    
 
  //   // console.log(this.filteredProgramList)

  //   this.filteredProgramList = this.programList.filter((program:any) =>
  //       program.toLowerCase().includes(value)
  //   );

  //   console.log(this.filteredProgramList)
  // }
}
