import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>({} as User);
  loggedIn= new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient ,private router:Router,private CookieService:CookieService) { }


  login (form:any)
  {
    return this.http.post('https://commerce-api-dev.onrender.com/api/v1/auth/login',form)
    .subscribe(
      data=>
      {
        console.log(data)
        this.handleLogin(data)
      },
      err=>
      {
        console.log(err)
      }
    )
  }

  private handleLogin(resData:any)
  {
    let userId= resData.data.master.id
    let userToken=resData.data.tokens
    let userRole=resData.data.master.role
     const newUser = new User(userId,userToken,userRole)
      this.user.next(newUser)
      this.loggedIn.next(true)

     this.setCookies(userToken,userId,userRole)
     console.log(this.user.value)
    
      this.loggedIn.next(true)
      this.getCookies()
     if(userRole == 'master')
     {
      this.router.navigate(['/master'])
     }

      
  }



  setCookies(token:any,id:any,role:any)
  {

   
    this.CookieService.set('id',id)
    this.CookieService.set('token',token)
    this.CookieService.set('role',role);
    
    
    this.getCookies()


  
  }

  getCookies()
  {

    
    if(this.CookieService.check('token'))
    {
      console.log('yes')
      const newUser = new User(this.CookieService.get('id'),this.CookieService.get('token'),this.CookieService.get('role'))
      this.user.next(newUser)
      console.log(this.user.value)
    }
    else
    {
      console.log('no')
    }
  

  
  }

  deleteCookies()
  {
    this.CookieService.deleteAll()
    // this.loggedIn.next(false)
  }



  logOut()
  {
    this.deleteCookies()
    this.user.next(<User>({}))
  
    this.router.navigate(['/login'])
    this.loggedIn.next(false)
  
  }
}
