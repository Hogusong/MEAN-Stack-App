import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { USER } from '../models';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private loginSubject = new Subject<string>();
  private authSubject = new Subject<boolean>();
  authStatus = false;
  tokenTimer: any;

  constructor(private http: HttpClient) { }

  getAuthStatus() {
    return this.authStatus;
  }

  getAuthSubject() {
    return this.authSubject.asObservable();
  }

  getLoginSubject() {
    return this.loginSubject.asObservable();
  }

  getToken() {
    return this.token;
  }

  signup(newUser: USER) {
    return this.http.post<any>(BACKEND_URL + 'signup', newUser)
  }

  login(email, password) {
    this.http.post<{token:string, expiresIn: number, userId: string}>(BACKEND_URL + 'login', { email, password })
      .subscribe(res => {
        this.token = res.token;
        const expiresIn = res.expiresIn * 1000
        if (this.token) {
          this.loginSubject.next('LOGGED IN');
          this.authSubject.next(this.authStatus = true);
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

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const expiresIn = authInformation.expirationDate.getTime() - (new Date()).getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.authSubject.next(this.authStatus = true);
      this.setAuthTimer(expiresIn);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (token && expiration) {
      return { token: token,  expirationDate: new Date(expiration) }
    }
    return { token: '', expirationDate: new Date() } ;
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
    this.authSubject.next(this.authStatus = false);
  }
}
