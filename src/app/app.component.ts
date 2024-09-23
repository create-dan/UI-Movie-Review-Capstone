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


  ngOnInit() {
    const isTokenValid = this.authService.checkTokenValidity();
    if (!isTokenValid) {
      this.router.navigateByUrl("/login");
    }else{
      this.authService.getUserById(Number(localStorage.getItem('userId'))).subscribe()
    }

    

  }
}
