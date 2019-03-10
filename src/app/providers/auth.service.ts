import { Injectable } from '@angular/core';

import { USER } from '../models'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: USER[] = [];

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
}
