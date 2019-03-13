import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { POST } from '../models';

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

  addPost(post: POST, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.http.post<{ post: POST, message: string }>
      ('http://localhost:3000/api/posts/add', postData)
      .subscribe(data => {
        post = data.post;
        this.posts.push(post);
        this.updatedPostsSubject.next({ posts: [...this.posts], count: ++this.count });
      }
      ,error => console.log(error.error.message));
  }

  deletePost(id: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + id);
  }
}
