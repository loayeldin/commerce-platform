import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  arrowIconClass = 'fas fa-arrow-left';

  loggedIn = false
  userName!:any
  constructor(private authService:AuthService){}

  ngOnInit()
  {
    this.authService.getCookies()
    this.authService.user.subscribe(data=>
      {
        if (Object.keys(this.authService.user.getValue()).length !== 0) {
          // `user` variable contains values
          // Perform your logic here
          this.authService.user.subscribe(data=>
            {
              this.userName =data.id
            })
          this.loggedIn=true
  
           console.log('helloooo')
  
  
        } else {
          // `user` variable does not contain values
          // Perform your logic here
          console.log('nooooooo')
           this.loggedIn=false
        }
      })
  }


  logOut()
  {
   console.log('logout')
    this.authService.logOut()
    this.loggedIn=false
    // this.authService.deleteCookies()
  }


}
