import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { POST } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<{ posts: POST[] }>('http://localhost:3000/api/posts');
  }
}
