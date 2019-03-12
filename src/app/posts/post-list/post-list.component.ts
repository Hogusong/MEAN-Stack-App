import { Component, OnInit } from '@angular/core';
import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: POST[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(data => this.posts = data.posts,
      error => console.log(error.error.message));
  }
}
