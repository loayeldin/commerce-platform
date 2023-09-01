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
import { EmployeeComponent } from './employee/employee.component';
import { ShowStudentsComponent } from './employee/show-students/show-students.component';
import { StudentReqDataComponent } from './employee/student-req-data/student-req-data.component';
import { AdminComponent } from './admin/admin.component';
import { MasterComponent } from './master/master.component';
import { MasterHomeComponent } from './master/master-home/master-home.component';
import { MasterCollegeComponent } from './master/master-college/master-college.component';
import { MasterAdminsComponent } from './master/master-admins/master-admins.component';

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

  {path:'employee', component:EmployeeComponent,children:[
    {path:'',redirectTo:'showStudents',pathMatch:'full'},
    {path:'showStudents', component:ShowStudentsComponent},
    { path:'showStudents/:id', component:StudentReqDataComponent}

  ]},

  {path:'admin', component:AdminComponent},


  {path:'master', component:MasterComponent,children:[
    {path:'' ,redirectTo:'home',pathMatch:'full'},
    {path:'home',component:MasterHomeComponent},
    {path:'college',component:MasterCollegeComponent},
    {path:'admins',component:MasterAdminsComponent}

    

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
