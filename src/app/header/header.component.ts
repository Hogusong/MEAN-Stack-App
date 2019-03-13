import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  authStatus: boolean;
  authSubscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatus();
    this.authSubscription = this.authService.getAuthSubject().subscribe(res => {
      this.authStatus = res;
    })
  }

  logout() {
    this.authStatus = false;
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
