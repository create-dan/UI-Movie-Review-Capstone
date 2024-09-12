import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { UserCredentials } from '../models/UserCredentials';
import { AuthService } from 'src/app/services/authenticatin/auth.service';

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
  errorFlag: boolean;

  constructor(private authService: AuthService) {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.successFlag = false;
    this.errorFlag = false;

    this.signInForm = new FormGroup({
      email: this.email,
      password: this.password
    })

  }

  handleLogin() {
    if (this.signInForm.valid) {
      const userCredentials = new UserCredentials(this.email.value, this.password.value);
      this.authService.loginUser(userCredentials).subscribe(
        response => {
          console.log('User logged in successfully', response);
          this.successFlag = true;
          this.errorFlag = false;
          // Handle the response, e.g., store the JWT token, navigate to another page, etc.
        },
        error => {
          console.error('Error logging in user', error);
          this.successFlag = false;
          this.errorFlag = true;
        }
      );
    }


  }


}
