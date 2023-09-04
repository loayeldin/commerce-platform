import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.scss']
})
export class AdminEmployeeComponent implements OnInit{
  constructor(private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute,private CookieService:CookieService){}
  ngOnInit(): void {
    this.collegeId = this.CookieService.get('collegeId')
    this.showEmployee()
    
  }
  token =this.authService.user.value.token
  addEmployee = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',Validators.compose([Validators.required , Validators.email])),
    password: new FormControl('',Validators.required),
  })
  removeEmployeeIndex = -1
  UpdatEmployeeIndex!:any
  employeeData!:any
  isLoading= true
  collegeId!:any
  adminProfile!:any
  updateEmployee!:any
  err!:any
  @ViewChild('editEmployeeSelect') editEmployeeSelect!: ElementRef;
  @ViewChild('removeEmployeeSelect') removeEmployeeSelect!: ElementRef;
 
  ngAfterContentChecked() {
   
    // to reset form when use close update modal
    if(this.employeeData != undefined)
    {
      console.log(this.employeeData)
      $('#updateEmploye').on('hidden.bs.modal',  (e: any) => {
        this.addEmployee.reset();
        this.editEmployeeSelect.nativeElement.value = null;
    
    
      })
    
         
           $('#addEmployee').on('hidden.bs.modal',  (e: any) => {
              this.addEmployee.reset();
             this.editEmployeeSelect.nativeElement.value = null;
             console.log('ssssssssss')
     
          })
          $('#deleteEmploye').on('hidden.bs.modal',  (e: any) => {
             this.addEmployee.reset();
            this.removeEmployeeSelect.nativeElement.value = null;
         })
    
      
    }


  }

  
  createEmployee(value:any)
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.post(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees`,value,{headers}).subscribe(data=>
    {
     
      console.log('program added')
      $('#addEmployee').modal('hide')
      this.showEmployee()
      this.addEmployee.reset();
    },
    err=>
    {
      console.log(err)
    })
  }

  showEmployee(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`

    })
    

    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees`,{headers}).subscribe(data=>{
    
    
    this.employeeData = data
    console.log(data);
    this.isLoading = false
    },
    
    err=>
    {
      this.addEmployee.reset()
      this.employeeData = undefined
      console.log(err)
    }
    )
  }

  navigateToParentComponent()
    {
      this.router.navigate(['../'], { relativeTo: this.route });
      console.log(this.route)
    }
  onSubmit(){
    console.log(this.addEmployee.value);
    this.createEmployee(this.addEmployee.value)
    
  }
  onEmployeeSelectChange(SelectedIndex:any){
    console.log(SelectedIndex,this.employeeData.data);
    
    this.updateEmployee = this.employeeData.data.employees[SelectedIndex]
    console.log(this.updateEmployee)
    this.addEmployee.patchValue({
      name:this.updateEmployee.name,
      email:this.updateEmployee.email,
      // password:this.updateEmployee.password
    })
    
  }


  updateEmployees(){
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    const SelectEmployeId = this.employeeData.data.employees[this.UpdatEmployeeIndex].id
    
    return this.http.patch(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees/${SelectEmployeId}`,this.addEmployee.value,{headers}).subscribe(data=>
    {
      console.log(data)
      this.showEmployee()
      $('#updateEmploye').modal('hide')
      
    
    },
    err=>
    {
      console.log(err)
    })

    }


  deleteEmployee(){
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    

    const SelectEmployeId = this.employeeData.data.employees[this.removeEmployeeIndex].id;

    
    
    return this.http.delete(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees/${SelectEmployeId}`,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#deleteEmploye').modal('hide')
      this.showEmployee()
    
    },
    err=>
    {
      console.log(err)
    })

  }
}

