import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/providers/auth.service';
import { USER } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupSubscription = new Subscription();
  pattern = "[a-zA-Z0-9]*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
  message = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.message = '';
    if (form.invalid) return;
    if (form.value.password !== form.value.confirmPass) {
      this.message = "Passwords are not matached.  Try again!!!";
      return
    }
    const user: USER =  { email: form.value.email,  password: form.value.password }
    if (this.authService.signup(user)) {
      this.router.navigate(['/login']);
    }
    this.message = 'Email is used already. Try another or login!!!';
  }
}
