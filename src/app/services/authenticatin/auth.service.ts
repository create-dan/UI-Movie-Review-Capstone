import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/components/models/User';
import { UserCredentials } from 'src/app/components/models/UserCredentials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(public http: HttpClient) { }
 
  // register(user: User) {
  //   let savedUser: any;
  //   return this.http.post<any>("http://localhost:8080/register", user);
  // }
 
  // loginUser(user: UserCredentials) {
  //   return this.http.post<any>("http://localhost:8080/login", user).subscribe(res => console.log(res))
  // }

  register(user: User): Observable<any> {
    return this.http.post<any>("http://localhost:8080/register", user);
  }

  loginUser(user: UserCredentials): Observable<any> {
    return this.http.post<any>("http://localhost:8080/login", user);
  }
}
 
