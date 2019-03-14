import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { POST } from '../models';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + 'posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: POST[];
  private updatedPostsSubject = new Subject<any>();
  private count: number; 

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<{ posts: POST[] }>(BACKEND_URL);
  }

  getUpdatedPostsSubject() {
    return this.updatedPostsSubject.asObservable()
  }

  getPostsByPage(pageSize: number, currPage: number) {
    const query = '?pageSize=' + pageSize + '&currPage=' + currPage;
    this.http.get<any>(BACKEND_URL + query)
      .subscribe(data => {
        this.posts = data.posts;
        this.count = data.count;
        this.updatedPostsSubject.next({ posts: [...this.posts], count: this.count});
      });
  }

  getPostById(id: string) {
    return this.http.get<any>(BACKEND_URL + id)
  }

  addPost(post: POST, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.http.post<{ post: POST, message: string }>
      (BACKEND_URL + 'add', postData)
      .subscribe(data => {
        post = data.post;
        this.posts.push(post);
        this.updatedPostsSubject.next({ posts: [...this.posts], count: ++this.count });
      }
      ,error => console.log(error.error.message));
  }

  deletePost(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }

  updatePost(post: POST, image: File | string) {
    let postData: POST | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', post.id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
    } else {
      postData = post;
    }
    this.http.put(BACKEND_URL + 'update', postData)
      .subscribe(res => {
        const index = this.posts.findIndex(p => p.id === post.id );
        if (index > -1) {
          this.posts[index] = post;
          this.updatedPostsSubject.next({ posts: [...this.posts], count: this.count });
        }    
      });
  }
}
