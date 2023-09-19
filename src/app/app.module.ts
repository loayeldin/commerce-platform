import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { ProgramListComponent } from './applicant/program-list/program-list.component';
import { ProgramDetailsComponent } from './applicant/program-details/program-details.component';
import { ProgramApplicationComponent } from './applicant/program-application/program-application.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ShowStudentsComponent } from './employee/show-students/show-students.component';
import { StudentReqDataComponent } from './employee/student-req-data/student-req-data.component';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { MasterComponent } from './master/master.component';
import { MasterHomeComponent } from './master/master-home/master-home.component';
import { MasterAdminsComponent } from './master/master-admins/master-admins.component';
import { MasterCollegeComponent } from './master/master-college/master-college.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProgramComponent } from './admin/admin-program/admin-program.component';
import { AdminEmployeeComponent } from './admin/admin-employee/admin-employee.component';

import { CreateAdminsComponent } from './master/master-admins/create-admins/create-admins.component';
import { AdminProgramDetailsComponent } from './admin/admin-program-details/admin-program-details.component';
import { AddAdminComponent } from './admin-employee/add-admin/add-admin.component';
import { AllApplicationsComponent } from './applicant/all-applications/all-applications.component';
import { ApplicationDetailsComponent } from './applicant/application-details/application-details.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { DeplomsComponent } from './employee/deploms/deploms.component';
import { DateFormatPipe } from './date-format.pipe';








@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    EmployeeComponent,
    AdminComponent,
    LecturerComponent,
    ApplicantComponent,
    ProgramListComponent,
    ProgramDetailsComponent,
    ProgramApplicationComponent,
    MyprofileComponent,
    ShowStudentsComponent,
    LoadingSpinnerComponent,
    
    StudentReqDataComponent,
         MasterComponent,
         MasterHomeComponent,
         MasterAdminsComponent,
         MasterCollegeComponent,
         LoadingSpinnerComponent,
         AdminHomeComponent,
         AdminProgramComponent,
         AdminEmployeeComponent,
         CreateAdminsComponent,
         AdminProgramDetailsComponent,
         AllApplicationsComponent,
         ApplicationDetailsComponent,
         EmployeeHomeComponent,
         DeplomsComponent,
        
         DateFormatPipe, // Add your custom pipe to the declarations array

        
     

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
