import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authStatus = false;

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('Logged in');
    this.authStatus = true;
  }

  signup() {
    console.log('Signup');
    this.authStatus = true;
  }

  addNew() {
    console.log('Add New');
  }

  showPosts() {
    console.log('Show all posts')
  }
}
