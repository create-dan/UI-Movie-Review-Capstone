import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authenticatin/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username:FormControl;
  email: FormControl;
  password: FormControl;

  signUpForm: FormGroup;

  successFlag: boolean;
  errorFlag: boolean;

  constructor(private authService : AuthService) {
    this.username = new FormControl('',[Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.successFlag = false;
    this.errorFlag = false;

    this.signUpForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password
    });

  }

  handleSignUp(){
    console.log("handle");
    if (this.signUpForm.valid) {
      console.log('aat');
      const user = new User(this.username.value, this.email.value, this.password.value,"USER");
      this.authService.register(user).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.successFlag = true;
          this.errorFlag = false;
        },
        error => {
          console.error('Error registering user', error);
          this.successFlag = false;
          this.errorFlag = true;
        }
      );
    }
  }

}
