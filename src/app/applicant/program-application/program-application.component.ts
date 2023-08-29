import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-program-application',
  templateUrl: './program-application.component.html',
  styleUrls: ['./program-application.component.scss']
})
export class ProgramApplicationComponent {




  applicationForm = new FormGroup({
    BachelorDegree: new FormControl(''),
    qualification: new FormControl(''),
  });


  // onSubmit()
  // {
  //   console.log(this.applicationForm.value)
  // }

  // handleBachelorDegree(event: any): void {
  //   const file = event.target.files[0];
    
  //   if (file) {
  //     // Do something with the selected file, e.g., upload it to a server
    
  //     $('.Bachelor-degree').html(file.name)
  //     this.applicationForm.patchValue({ BachelorDegree: file.name});
  //   }
  // }

  onSubmit() {
    console.log(this.applicationForm.value);
  }

  handleDegreeChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const control = this.applicationForm.get('BachelorDegree');
      if (control) {
        control.setValue(file.name);
      }
    }
  }

  handleQualificationChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const control = this.applicationForm.get('qualification');
      if (control) {
        control.setValue(file.name);
      }
    }
  }
}
