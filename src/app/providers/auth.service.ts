import { Injectable } from '@angular/core';

import { USER } from '../models'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: USER[] = [];

  constructor(private http: HttpClient) { }

  signup(newUser: USER) {
    return this.http.post<any>('http://localhost:3000/api/signup', newUser)
  }

  login(email, password) {
    const user = this.users.find(user => user.email === email);
    if (!user) {
      return { loggedIn: false, message: 'Failed to find the email. Confirm the email . . .' }
    } else if (user.password != password) {
      return { loggedIn: false, message: 'Password not matched. Try another . . .' }
    } 
    return { loggedIn: true, message: 'Logged in successfully. Enjoy my app !!!' };
  }
}
