import { Component, OnInit, OnDestroy } from '@angular/core';
import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: POST[] = [];
  isLoading = false;
  totalPosts = 0;
  currPage = 1;
  postPerPage = 10;
  pageSizeOptions = [3, 6, 10, 20, 30, 40, 50];
  private postsSubscription = new Subscription();

  userId: string;
  authStatus = false;
  private authSubscription = new Subscription();

  constructor(private postService: PostService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.authStatus = this.authService.getAuthStatus();
    this.authSubscription = this.authService.getAuthSubject()
      .subscribe(status => this.authStatus = status);
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

  onDelete(id: string) {
    this.postService.deletePost(id).subscribe(res => {
      this.loadPosts();
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
