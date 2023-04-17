/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../../models/response.model';

@Component({
  selector: 'bedavayemek-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.getPostById();
  }
  isLoaded = false;
  postId = '';
  isLoading = false;
  post!: Post;
  dataURI = '';

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    expireDate: ['', Validators.required],
  });

  getPostById() {
    this.isLoading = true;
    this.postService.getPostById(this.postId).subscribe((data) => {
      this.post = data.data;
      console.log(this.post);

      this.dataURI = this.post.image!;
      this.form.patchValue({
        title: this.post.title,
        description: this.post.description,
        location: this.post.location,
      });
      this.isLoading = false;
      this.isLoaded = true;
    });
  }

  editPost() {
    console.log(this.form.invalid);
    if (this.form.invalid || this.dataURI === '') {
      this._snackBar.open('Lütfen tüm alanları doldurun.', 'Tamam', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;

    const post: Post = {
      id: '',
      title: this.form.value.title,
      description: this.form.value.description,
      image: this.dataURI,
      rating: 0,
      location: this.form.value.location,
      expireDate: this.form.value.expireDate,
    };

    this.postService.updatePostById(this.postId, post).subscribe((data) => {
      if (!data.isSuccessful) {
        this._snackBar.open(data.message, 'Tamam', {
          duration: 2000,
        });
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      this.router.navigate(['/post', this.postId]);
      this._snackBar.open('Gönderi başarıyla güncellendi.', 'Tamam', {
        duration: 2000,
      });
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        this.dataURI = reader.result.toString();
      }
    };
  }
}
