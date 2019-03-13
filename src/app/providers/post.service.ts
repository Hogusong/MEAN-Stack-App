import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { POST } from '../models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: POST[];
  private updatedPostsSubject = new Subject<any>();
  private count: number; 

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<{ posts: POST[] }>('http://localhost:3000/api/posts');
  }

  getUpdatedPostsSubject() {
    return this.updatedPostsSubject.asObservable()
  }

  getPostsByPage(pageSize: number, currPage: number) {
    const query = '?pageSize=' + pageSize + '&currPage=' + currPage;
    this.http.get<any>('http://localhost:3000/api/posts' + query)
      .subscribe(data => {
        this.posts = data.posts;
        this.count = data.count;
        this.updatedPostsSubject.next({ posts: [...this.posts], count: this.count});
      });
  }

  getPostById(id: string) {
    return this.http.get<any>('http://localhost:3000/api/posts/' + id)
  }

  addPost(newPost: POST) {
    this.http.post('http://localhost:3000/api/posts/add', newPost)
      .subscribe(data => console.log(data)
      ,error => console.log(error.error.message));
  }

  deletePost(id: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + id);
  }
}
