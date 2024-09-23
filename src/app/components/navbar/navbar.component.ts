import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authenticatin/auth.service';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService:AuthService,public router:Router,public userProfileService:UserProfileService){

  }

  ngOnInit(){
   console.log(this.userProfileService.getUserProfile().userRole)
  }


  logout(): void {
   
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userId');

    this.authService.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
