import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any
@Component({
  selector: 'app-admin-program',
  templateUrl: './admin-program.component.html',
  styleUrls: ['./admin-program.component.scss']
})
export class AdminProgramComponent {

  constructor(private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute,private CookieService:CookieService){}
  addDiploma = new FormGroup({
    'name': new FormControl(),
    'description' : new FormControl(),
    'applying_fees': new FormControl(),
    'program_fees' : new FormControl(),
    'open_at' : new FormControl(),
    'close_at' : new FormControl(),
    'credit_hour_fees': new FormControl(),


  })


  programUpdateIndex!:any

  collegesLoad = false
  programsData!:any
  collegeId!:any
  adminProfile!:any
  userRole= this.authService.user.value.role
  updateProgramData!:any
  isLoading = true
  updateProgramId!:any
  token = this.authService.user.value.token
  removeProgramIndex = -1
  ngOnInit()
  {
    this.getCollegeId()
  
 
  }



  ngAfterViewInit() {
    
    // to reset form when use close update modal
    $('#updateDiploma').on('hidden.bs.modal',  (e: any) => {
      // do something...
      this.addDiploma.reset();

   
    
    })
  }

// start display all programs//
 getCollegeId()
 {
 
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/me`,{headers}).subscribe(data=>
    {
      this.CookieService.delete('collegeId');
      this.adminProfile = data
      this.collegeId = this.adminProfile.data.adminData.collage_id
      console.log(this.collegeId)
      this.CookieService.set('collegeId',this.collegeId) // put college id in cookies to use it in admin program details
      this.showPrograms()
     
    },
    err=>
    {
      console.log(err)
    })

  
 }

  showPrograms()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs`,{headers}).subscribe(data=>
    {
     
      this.programsData = data
      console.log(this.programsData.data.programs)
      this.isLoading = false
     
    },
    err=>
    {
      console.log(err)
    })
  }


// end display all programs//


//start add diploma functions
  onSubmitNewPorgram()
  {
    console.log(this.addDiploma.value)
    this.addProgram(this.addDiploma.value)
  }
  addProgram(value:any)
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.post(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs`,value,{headers}).subscribe(data=>
    {
     
      console.log('program added')
      $('#addDiploma').modal('hide')
      this.showPrograms()
     
    },
    err=>
    {
      console.log(err)
    })
  }
  //end add diploma functions






// start update program functions //
  onCollegeSelectionChange(selectedIndex:any)
  {

    console.log(this.programUpdateIndex)
    
    this.updateProgramData = this.programsData.data.programs[selectedIndex];
    this.updateProgramId = this.programsData.data.programs[selectedIndex].id


    console.log(this.updateProgramId)
    const dateStr = this.updateProgramData.open_at;
    const dateEnd = this.updateProgramData.close_at;
    const StartdateObject = new Date(dateStr);
    const enddateObject = new Date(dateEnd);
    
    // Format the date as 'yyyy-MM-dd' for input[type="date"]
    const formattedSDate = StartdateObject.toISOString().split('T')[0];
    const formattedEDate = enddateObject.toISOString().split('T')[0];

    console.log(formattedSDate)

    this.addDiploma.patchValue({
          name: this.updateProgramData.name,
          description:this.updateProgramData.description,
          applying_fees:this.updateProgramData.applying_fees,
          program_fees:this.updateProgramData.program_fees,
          credit_hour_fees:this.updateProgramData.credit_hour_fees,
          open_at:formattedSDate,
          close_at:formattedEDate




  
       });
  }


    onSubmitUpdateProgram()
    {
      console.log(this.addDiploma.value)

      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    

      return this.http.patch(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs/${this.updateProgramId}`,
      this.addDiploma.value,
      {headers})
      .subscribe(data=>
      {
        console.log(data)
       this.showPrograms()
        $('#updateDiploma').modal('hide')
      
      },
      err=>
      {
        console.log(err)
      })
    }
// end update program functions //




openProgramDetails(index:number)
{
  const programId= this.programsData.data.programs[index].id
  console.log(programId)
  // this.router.navigate(['/employee/showStudents', studentId]);
  this.router.navigate([`admin/programs`,programId])
}

  readMore(index:number)
  {
    console.log(this.programsData.data.programs[index],this.collegeId)
  }


    // when click on home icon let him go back to parent component
    navigateToParentComponent()
    {
      this.router.navigate(['../'], { relativeTo: this.route });
      console.log(this.route)
    }




    removeProgram() {
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
      
      // Access the selected value using this.removeProgramIndex
      console.log('Selected Index:', this.removeProgramIndex);
  
      const selectedprogramId = this.programsData.data.programs[this.removeProgramIndex].id;

      
      
      return this.http.delete(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs/${selectedprogramId}`,{headers}).subscribe(data=>
      {
        console.log(data)
        $('#deleteProgram').modal('hide')
        this.showPrograms()
      
      },
      err=>
      {
        console.log(err)
      })
  
    }

}
