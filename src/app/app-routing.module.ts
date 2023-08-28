import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { ProgramListComponent } from './applicant/program-list/program-list.component';
import { ProgramDetailsComponent } from './applicant/program-details/program-details.component';
import { ProgramApplicationComponent } from './applicant/program-application/program-application.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
   {path:'',redirectTo:'/home', pathMatch:'full'},
   {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'myprofile',component:MyprofileComponent},
  {path:'signup',component:SignupComponent},
  {path:'applicant',component:ApplicantComponent,children:[
    {path:'',redirectTo:'program-list', pathMatch:'full'},
    {path:'program-list',component:ProgramListComponent},
    {path:'program-details',component:ProgramDetailsComponent},
    {path:'program-application',component:ProgramApplicationComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }