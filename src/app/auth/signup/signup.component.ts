import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  pattern = "[a-zA-Z0-9]*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.invalid) return;
    console.log('Signup well, now login to start!!!')
    console.log(form.value);
    this.router.navigate(['/login']);
  }
}
