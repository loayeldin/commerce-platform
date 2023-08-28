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

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
