/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'bedavayemek-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  isLoading = false;

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    location: ['', Validators.required],
    expireDate: ['', Validators.required],
  });

  createPost() {
    console.log(this.form.invalid);
    if (this.form.invalid) {
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

    this.postService.createPost(post).subscribe((data) => {
      if (!data.isSuccessful) {
        this._snackBar.open(data.message, 'Tamam', {
          duration: 2000,
        });
        this.isLoading = false;
        return;
      }
      this._snackBar.open(data.message, 'Tamam', {
        duration: 2000,
      });
      this.isLoading = false;
    });
  }

  dataURI = '';

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
