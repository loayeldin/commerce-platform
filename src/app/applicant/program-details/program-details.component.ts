import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent {
  constructor(private router:Router){}


  openApplication(){
    this.router.navigate(['applicant/program-application'])
  }



}
