import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  userId: string;
  postId: string;
  post: POST = { title: '', content: '', imagePath: 'unknown', creator: '' };

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.postId = this.activatedRoute.snapshot.params['id'];
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(res => this.post = res);
    } 
  }

  onSavePost(ngForm: NgForm) {
    if (ngForm.invalid) {  return  }
    const newTitle = ngForm.value.title.trim();
    const newContent = ngForm.value.content.trim();
    if (newTitle.length > 2 && newContent.length > 0) {
      const post: POST = { title: newTitle, content: newContent, imagePath: 'unknown', creator: this.userId };
      if (!this.postId) {
        this.postService.addPost(post);
      } else {
        post.id = this.postId;
        // this.postService.updatePost(post);
      }
    }
    this.router.navigate(['/']);
  }
}
