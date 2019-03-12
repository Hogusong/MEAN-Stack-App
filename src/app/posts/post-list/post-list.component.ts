import { Component, OnInit } from '@angular/core';
import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: POST[] = [];
  isLoading = true;
  totalPosts = 0;
  currPage = 1;
  postPerPage = 10;
  pageSizeOptions = [3, 6, 10, 20, 30, 40, 50];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      setTimeout(() => {
        this.posts = data.posts;
        this.totalPosts = this.posts.length;
        this.isLoading = false;        
      }, 1000);
    }, error => console.log(error.error.message));
  }

  onChangePage(pageData: PageEvent) {
    this.currPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
  }
}
