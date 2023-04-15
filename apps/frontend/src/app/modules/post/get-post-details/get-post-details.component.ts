/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bedavayemek-get-post-details',
  templateUrl: './get-post-details.component.html',
  styleUrls: ['./get-post-details.component.scss'],
})
export class GetPostDetailsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.getPostById(this.postId);
  }

  commentForm = this.formBuilder.group({
    image: [''],
    comment: ['', Validators.required],
  });

  postId = '';
  post!: Post;
  reviews: Review[] = [];
  isLoading = false;
  ratingInput = 0;

  getPostById(postId: string) {
    this.isLoading = true;
    this.postService.getPostById(postId).subscribe((data) => {
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.post = data.data;
      this.getReviewsByPostId(postId);
      this.isLoading = false;
    });
  }

  getReviewsByPostId(postId: string) {
    this.reviewService.getReviewsByPostId(postId).subscribe((data) => {
      if (!data.isSuccessful) {
        return;
      }
      this.reviews = data.data;
    });
  }

  createReview() {
    console.log(this.commentForm);
    if (this.commentForm.invalid) {
      this._snackBar.open('Lütfen tüm alanları doldurunuz', 'Tamam', {
        duration: 2000,
      });
      return;
    }
    this.isLoading = true;
    const review: Review = {
      id: '',
      rating: this.ratingInput,
      image: this.commentForm.value.image,
      comment: this.commentForm.value.comment,
    };

    console.log(review);
    this.reviewService.createReview(review, this.post.id).subscribe((data) => {
      if (!data.isSuccessful) {
        this._snackBar.open(data.message, 'Tamam', {
          duration: 2000,
        });
        this.isLoading = false;
        return;
      }
      if (review.rating === 0 || this.dataURI === '') {
        this._snackBar.open('Lütfen tüm alanları doldurunuz', 'Tamam', {
          duration: 2000,
        });
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      this._snackBar.open('Yorumunuz başarıyla eklendi', 'Tamam', {
        duration: 2000,
      });
      this.getReviewsByPostId(this.post.id);
      this.commentForm.reset();
      this.rate(0);
      this.dataURI = '';
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

  rate(value: number) {
    for (let i = 1; i <= value; i++) {
      document.getElementById('star' + i)?.classList.remove('text-gray-500');
      document.getElementById('star' + i)?.classList.add('text-yellow-400');
    }
    for (let i = value + 1; i <= 5; i++) {
      document.getElementById('star' + i)?.classList.remove('text-yellow-400');
      document.getElementById('star' + i)?.classList.add('text-gray-500');
    }
    this.ratingInput = value;
  }
}
