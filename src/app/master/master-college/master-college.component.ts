import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
declare var $:any
@Component({
  selector: 'app-master-college',
  templateUrl: './master-college.component.html',
  styleUrls: ['./master-college.component.scss']
})
export class MasterCollegeComponent {

  constructor(private masterService:MasterService,private http:HttpClient,private authService:AuthService){}
  removeCollegeIndex = -1
  updateCollegeData!:any
  token =this.authService.user.value.token
  collegesLoad = false
  colleges!:any
  collegeForm= new FormGroup(
    {
      name: new FormControl('',[Validators.required]),
      universityName: new FormControl('',[Validators.required])
    })
    @ViewChild('updateCollegeModal') updateCollegeModal!: ElementRef ;

    

    ngAfterViewInit() {
    
      // to reset form when use close update modal
      $('#updateCollege').on('hidden.bs.modal',  (e: any) => {
        // do something...
        this.collegeForm.reset();
      })
    }

    ngOnInit()
    {
      this.showColleges()

   
    }




    onSubmit()
    {
      console.log(this.collegeForm.value)
      this.addCollegee(this.collegeForm.value)
     
    }
   






      addCollegee(value:any)
    {
      
      
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
      return this.http.post('https://commerce-api-dev.onrender.com/api/v1/master/collages',value,{headers}).subscribe(data=>
      {
        console.log(data)
        $('#addCollege').modal('hide')

        this.showColleges()
      
      },
      err=>
      {
        console.log(err)
      }
      )
    }

    showColleges()
    {
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
      return this.http.get('https://commerce-api-dev.onrender.com/api/v1/master/collages',{headers}).subscribe(data=>
      {
        this.colleges = data
      
      this.collegesLoad=true
      },
      err=>
      {
        console.log(err)
      })
      
    }



    removeCollege() {
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
      // Access the selected value using this.removeCollegeIndex
      console.log('Selected Index:', this.removeCollegeIndex);
  
      const selectedCollegeId = this.colleges.data.collages[this.removeCollegeIndex].id;
      
      return this.http.delete(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${selectedCollegeId}`,{headers}).subscribe(data=>
      {
        console.log(data)
        $('#deleteCollege').modal('hide')
        this.showColleges()
      
      },
      err=>
      {
        console.log(err)
      })
  
    }


    getUpdateIndex(index:number)
    {
      this.updateCollegeData = this.colleges.data.collages[index];
      console.log(this.updateCollegeData)
      this.collegeForm.patchValue({
        name: this.updateCollegeData.name,
        universityName:this.updateCollegeData.university_name

     });
    }

    updateCollege()
    {
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
      console.log(this.updateCollegeData.id,this.collegeForm.value)

      return this.http.patch(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.updateCollegeData.id}`,this.collegeForm.value,{headers}).subscribe(data=>
      {
        console.log(data)
        this.showColleges()
        $('#updateCollege').modal('hide')
      },
      err=>
      {
        console.log(err)
      })
    }
    

  }