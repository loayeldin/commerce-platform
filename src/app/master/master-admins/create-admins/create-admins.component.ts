import { Component, ElementRef, ViewChild } from '@angular/core';
import { MasterService } from '../../master.service';
import { AuthService } from 'src/app/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any

@Component({
  selector: 'app-create-admins',
  templateUrl: './create-admins.component.html',
  styleUrls: ['./create-admins.component.scss']
})
export class CreateAdminsComponent {
  removeAdmin = -1
  editAdmin!:any
  UpdateAdmin!:any
  collageId!:any
  token =this.authService.user.value.token
  isLoading = true 
  colleges!:any
  admiins!:any
  err!:any
  
  adminForm= new FormGroup(
    {
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',Validators.compose([Validators.required , Validators.email])),
      password: new FormControl('',Validators.required),
      // universityName: new FormControl('',[Validators.required])
    })



    @ViewChild('updateAdminSelect') updateAdminSelect!: ElementRef;
    @ViewChild('removeAdminSelect') removeAdminSelect!: ElementRef;


  constructor(private masterService:MasterService,private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.showAdmin()
  }
  ngAfterContentChecked()
  {
    if(this.admiins !=undefined)
    {
      setTimeout(() => {
        $('#addAdmin').on('hidden.bs.modal', () => {
            this.adminForm.reset();
            this.updateAdminSelect.nativeElement.value = null;
  
            // Reset the <select> element to its initial value
        });
  
        $('#updateAdmin').on('hidden.bs.modal', () => {
            this.adminForm.reset();
         
            // Reset the <select> element to its initial value
            this.updateAdminSelect.nativeElement.value = null;
        });
  
  
        $('#deleteAdmin').on('hidden.bs.modal', () => {
          this.adminForm.reset();
       
          // Reset the <select> element to its initial value
          this.removeAdminSelect.nativeElement.value = null;
      });
    }, 1000); // Delay for 1 second
  
    }
  }


  
  CLICK(index:any){
    const CollegeId = this.colleges.data[index].id;
    console.log(CollegeId);
  }
  
  createAdmin(value:any)
  {
      
      
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    this.collageId = this.route.snapshot.paramMap.get('id')
    
    
    
    return this.http.post(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins`,value,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#addAdmin').modal('hide')

      this.showAdmin()
    
    },
    err=>
    {
      console.log(err)
    }
    )
  }
  showAdmin(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    this.collageId = this.route.snapshot.paramMap.get('id')
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins`, {headers}).subscribe(data=>{
      this.admiins = data
      this.isLoading = false
      this.err = undefined
      
      
      
    },
    err=>{
      this.err = err.error.message
      // this.isLoading=true
      this.admiins = undefined
    }
    )
  }
  deleteAdmin() {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    // Access the selected value using this.removeCollegeIndex
    console.log('Selected Index:', this.removeAdmin);

    const selectedCollegeId = this.admiins.data.admins[this.removeAdmin].id;
    this.collageId = this.route.snapshot.paramMap.get('id')
    return this.http.delete(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins/${selectedCollegeId}`,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#deleteAdmin').modal('hide')
      this.showAdmin()
    
    },
    err=>
    {
      console.log(err)
    })

  }

 
  onAdminsSelectionChange(selectedIndex:any){
    console.log(selectedIndex);
    
    this.editAdmin = this.admiins.data.admins[selectedIndex]

    this.adminForm.patchValue({
      name: this.editAdmin.name,
      email:this.editAdmin.email,
      password: this.editAdmin.password

   });
  }
 
  updateAdmins(){
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    this.collageId = this.route.snapshot.paramMap.get('id')

    return this.http.patch(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins/${this.editAdmin.id}`,this.adminForm.value,{headers}).subscribe(data=>
    {
      console.log(data)
      this.showAdmin()
      $('#updateAdmin').modal('hide')
      this.updateAdminSelect.nativeElement.value = null;
    },
    err=>
    {
      console.log(err)
    })
  }

  navigateToParentComponent()
  {
    this.router.navigate(['../'], { relativeTo: this.route });

  }

   
  onSubmit(){
    console.log(this.adminForm.value)
    this.createAdmin(this.adminForm.value)
  }
  
}
