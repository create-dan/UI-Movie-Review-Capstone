import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authenticatin/auth.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { validateEmail } from 'src/app/validators/email-validator';
import { validatePassword } from 'src/app/validators/password-validator';

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

  constructor(private authService : AuthService,private router:Router) {
    this.username = new FormControl('',[Validators.required]);
    this.email = new FormControl('', [Validators.required,validateEmail]);
    this.password = new FormControl('', [Validators.required,Validators.minLength(8),validatePassword]);
    this.successFlag = false;
    this.errorFlag = false;

    this.signUpForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password
    });

  }

  handleSignUp(){
    let user: User = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      role: "USER"
    }
    this.authService.register(user).subscribe(
      () => {
        
        this.successFlag=true;
        setTimeout(() => {
          this.successFlag=false;
        }, 3000);
        this.router.navigate(['/login']);
      },
      error => {
        
        console.error('Error registering user:', error);
      }
    );
  }

}
