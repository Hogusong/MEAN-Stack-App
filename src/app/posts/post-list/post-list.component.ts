import { Component, OnInit } from '@angular/core';
import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: POST[] = [];
  isLoading = false;
  totalPosts = 0;
  currPage = 1;
  postPerPage = 10;
  pageSizeOptions = [3, 6, 10, 20, 30, 40, 50];
  postsSubscription = new Subscription();

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    setTimeout(() => {
      this.postService.getPostsByPage(this.postPerPage, this.currPage)
      this.postsSubscription = this.postService.getUpdatedPostsSubject()
        .subscribe((res: any) => {
          this.posts = res.posts;
          this.totalPosts = res.count;
        });
      this.isLoading = false;
    }, 500);
  }

  onChangePage(pageData: PageEvent) {
    this.currPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.loadPosts();
  }
}
