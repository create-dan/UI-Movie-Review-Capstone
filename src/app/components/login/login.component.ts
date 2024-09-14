import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { UserCredentials } from '../models/UserCredentials';
import { AuthService } from 'src/app/services/authenticatin/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: FormControl;
  password: FormControl;
  signInForm: FormGroup;

  successFlag: boolean;


  constructor(public router: Router, public authService: AuthService) {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.successFlag = false;

    this.signInForm = new FormGroup({
      email: this.email,
      password: this.password
    })

  }

  handleLogin() {

    let userCredentials: UserCredentials = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }
    this.authService.loginUser(userCredentials).subscribe(response => {
      this.router.navigateByUrl("/")
    },
      err => {
        console.error('Login Failed', err)
      })

  }

}
