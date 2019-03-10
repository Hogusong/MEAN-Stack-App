import { Injectable } from '@angular/core';

import { USER } from '../models'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private users: USER[] = [];
  private loginSubject = new Subject<string>();
  tokenTimer: any;

  constructor(private http: HttpClient) { }

  getLoginSubject() {
    return this.loginSubject.asObservable();
  }

  getToken() {
    return this.token;
  }

  signup(newUser: USER) {
    return this.http.post<any>('http://localhost:3000/api/signup', newUser)
  }

  login(email, password) {
    this.http.post<{token:string, expiresIn: number, userId: string}>('http://localhost:3000/api/login', { email, password })
      .subscribe(res => {
        this.token = res.token;
        const expiresIn = res.expiresIn * 1000
        if (this.token) {
          this.loginSubject.next('LOGGEDIN');
          const expiration = (new Date()).getTime() + expiresIn;
          this.saveAuthData(this.token, new Date(expiration), res.userId);
          this.setAuthTimer(expiresIn);
        }
      }, error => {
        this.loginSubject.next(error.error.message);
      });
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => { this.logout() }, duration)
  }

  saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  logout() {
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
}
