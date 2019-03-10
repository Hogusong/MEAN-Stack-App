import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pattern = "[a-zA-Z0-9]*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
  message = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.message = '';
    if (form.invalid) return;
    const result = this.authService.login(form.value.email, form.value.password);
    if (result.loggedIn) {
      console.log('Logged in successfully!!!');
    } 
    this.message = result.message;
  }
}
