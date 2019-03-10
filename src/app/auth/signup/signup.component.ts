import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/providers/auth.service';
import { USER } from 'src/app/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupSubscription = new Subscription();
  pattern = "[a-zA-Z0-9]*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
  message = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  onSignup(form: NgForm) {
    this.message = '';
    if (form.invalid) return;
    if (form.value.password !== form.value.confirmPass) {
      this.message = "Passwords are not matached.  Try again!!!";
      return
    }
    const user: USER =  { email: form.value.email,  password: form.value.password }
    this.authService.signup(user).subscribe(res => {
      if (res.user) {
        this.router.navigate(['/login']);
      } 
    }, error => {
      this.message = error.error.message;
    });
  }
}
