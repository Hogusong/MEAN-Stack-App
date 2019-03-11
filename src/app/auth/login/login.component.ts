import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  pattern = "[a-zA-Z0-9]*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
  message = '';
  loginSubscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginSubscription = this.authService.getLoginSubject()
      .subscribe(res => {
        if (res === 'LOGGED IN') {
          this.router.navigate(['/'])
        }
        this.message = res;
      })
  }

  onLogin(form: NgForm) {
    this.message = '';
    if (form.invalid) return;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
