import { Injectable } from '@angular/core';

import { USER } from '../models'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: USER[] = [];

  constructor() { }

  signup(newUser: USER) {
    if (this.users.find(user => user.email === newUser.email)) {
      return false;
    } else {
      newUser.id = '' + (this.users.length + 1);
      this.users.push(newUser);
      return true;
    }
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
