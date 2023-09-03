import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  testData = new BehaviorSubject<object>({})
  
  myProfileData!:any
  userName!:any
  constructor(private http:HttpClient ,private router:Router,private CookieService:CookieService) { }


  // login (form:any)
  // {
  //   return this.http.post('https://commerce-api-dev.onrender.com/api/v1/auth/login',form)
  //   .subscribe(
  //     data=>
  //     {
  //       console.log(data)
  //       this.handleLogin(data)
  //     },
  //     err=>
  //     {
  //       console.log(err)
  //     }
  //   )
  // }

  login (form:any)  
  {
    return this.http.post('https://commerce-api-dev.onrender.com/api/v1/auth/login',form)
    .pipe(
      tap(resData=>{
        console.log(resData)
        this.handleLogin(resData)
      })
    )
  }

  private handleLogin(resData:any)
  {
  
    console.log(resData)
    let userId= resData.data.master.id

    let userToken=resData.data.tokens

    let userRole=resData.data.master.role

    this.getMyProfile(userToken,userRole,userId) // call it to get userName first before put data in user & cookies

    //  const newUser = new User(userId,userToken,userRole,this.userName)
    //   this.user.next(newUser)


    //   this.loggedIn.next(true)

    //  this.setCookies(userToken,userId,userRole,this.userName)
    //  console.log(this.user.value)
 
    //   this.loggedIn.next(true)
    //   // this.getCookies()
    //  if(userRole == 'master')
    //  {
    //   this.router.navigate(['/master'])
    //  }else if(userRole == 'admin')
    //  {
    //   this.router.navigate(['/admin'])
    //  }

      
  }



  setCookies(token:any,id:any,role:any,userName:any,collegeId:any)
  {

   
    this.CookieService.set('id',id)
    this.CookieService.set('token',token)
    this.CookieService.set('role',role);
    this.CookieService.set('name',userName)
  
    if(this.user.value.role == 'admin')
    {
      this.CookieService.set('collegeId',collegeId)
    }
    
    this.getCookies()


  
  }

  getCookies()
  {

    
    if(this.CookieService.check('token'))
    {
      console.log('yes')
      const newUser = new User(this.CookieService.get('id'),this.CookieService.get('token'),this.CookieService.get('role'),this.CookieService.get('name'))
      this.user.next(newUser)
      console.log(this.user.value)
    }
    else
    {
      console.log('no')
      this.router.navigate(['/login'])
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


  getMyProfile(token:any,userRole:any,userId:any)
  {
   
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/${userRole}/me`,{headers}).subscribe(data=>
    {
      console.log(data)
     if(userRole == 'master')
     {
       
      this.myProfileData =data
      this.userName  = this.myProfileData.data.master.name

       const newUser = new User(userId,token,userRole,this.userName)
        this.user.next(newUser)
  
  
       
  
       this.setCookies(token,userId,userRole,this.userName,null)
       console.log(this.user.value)
   
        this.loggedIn.next(true)
      
      
        this.router.navigate(['/master'])



     }else if (userRole =='admin')
     {
      this.myProfileData =data
      this.userName  = this.myProfileData.data.adminData.name

       const newUser = new User(userId,token,userRole,this.userName)
        this.user.next(newUser)
  
  
       
      const collegeId= this.myProfileData.data.adminData.collage_id
       this.setCookies(token,userId,userRole,this.userName,collegeId)
       console.log(this.user.value)
   
        this.loggedIn.next(true)
      
      
        this.router.navigate(['/admin'])
      // this.profileAdminData = data
      // this.profileMasterData = undefined
      // this.profileLoaded=true
      // this.CookieService.set('admin-name',this.profileAdminData.data.adminData.name)
     }
     
    },
    err=>
    {
      console.log(err)
    })

  }



}
