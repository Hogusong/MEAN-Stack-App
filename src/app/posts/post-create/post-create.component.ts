import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mimeType } from './mine-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup;
  imagePreview: any;
  userId: string;
  postId: string;
  post: POST = { title: '', content: '', imagePath: 'unknown', creator: '' };

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.form = new FormGroup({
      title: new FormControl(null,
        { validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, { validators: [Validators.required]}),
      image: new FormControl(null, 
        { validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.postId = this.activatedRoute.snapshot.params['id'];
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(res => {
        this.post = res;
        this.form.setValue({
          title: this.post.title,
          content: this.post.content,
          image: this.post.imagePath
        });
      });
    } 
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
   
  onSavePost() {
    if (this.form.invalid) {  return  }
    const newTitle = this.form.value.title.trim();
    const newContent = this.form.value.content.trim();
    if (newTitle.length > 2 && newContent.length > 0) {
      const post: POST = {
        title: newTitle,
        content: newContent,
        imagePath: this.form.value.image,
        creator: this.userId
      };
      if (!this.postId) {
        this.postService.addPost(post, this.form.value.imange);
      } else {
        post.id = this.postId;
        // this.postService.updatePost(post, this.form.value.imange);
      }
    }
    this.router.navigate(['/']);
  }
}
