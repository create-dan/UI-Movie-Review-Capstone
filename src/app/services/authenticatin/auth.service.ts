import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/components/models/User';
import { UserCredentials } from 'src/app/components/models/UserCredentials';
import { UserProfile } from 'src/app/components/models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userProfile: UserProfile
  public isLoggedIn: boolean
  errorFlag: boolean

  canActivate(): boolean {
  
    if (this.checkTokenValidity()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  constructor(public http: HttpClient,public router:Router) {
    this.userProfile = new UserProfile()
    this.errorFlag = false
    this.isLoggedIn = false
  }

  register(user: User):Observable<any> {
    let savedUser: any;
    return this.http.post<any>("http://localhost:8080/register", user);
  }


  
  loginUser(user: UserCredentials): Observable<any> {
    return this.http.post<any>("http://localhost:8080/login", user).pipe(
      map(response => {
        if (response && response.token) {
          this.setSession(response);
          return { success: true, data: response };
        } else {
          throw new Error('Login Failed');
        }
      }),
      catchError(error => {
        console.log("Login Error", error);
        return throwError(error);
      })
    );
  }

  private setSession(authResult: any): void {
    const expiresAt = Date.now() + (10 * 60 * 60 * 1000); // 10 hours expiration
    localStorage.setItem('userId',authResult.userId);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('tokenExpiry', expiresAt.toString());
   
    this.isLoggedIn = true;
  }


  checkTokenValidity():boolean{
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');

    if(token && expiry && Date.now() < parseInt(expiry,10)){
      this.isLoggedIn=true;
      return true;
    }else{
      this.logout();
      return false;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    this.isLoggedIn=false;
  }
}