import { Component } from '@angular/core';
import { UserCredentials } from './components/models/UserCredentials';
import { Router } from '@angular/router';
import { AuthService } from './services/authenticatin/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-review-app';

  constructor(public router: Router, public authService: AuthService) {

  }
  // ngOnInit() {
  //   var userObj = localStorage.getItem('currentUser')

  //   if (userObj !== null) {
  //     var myUserDetails = JSON.parse(userObj)
  //     var userCreds: UserCredentials = new UserCredentials()
  //     userCreds.email = myUserDetails.email
  //     userCreds.password = myUserDetails.password


  //     this.authService.loginUser(userCreds).subscribe(
  //       response => {

  //         this.router.navigateByUrl("/")
  //       },
  //       err => {
  //         console.error('Login Failed', err)
  //       }
  //     )

  //   }
  //   else
  //     this.router.navigateByUrl("/login")
  // }

  ngOnInit(){
    const isTokenValid = this.authService.checkTokenValidity();
    if (!isTokenValid) {
      this.router.navigateByUrl("/login");
    }
  }
}
