/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Review } from '../../../models/review.model';

@Component({
  selector: 'bedavayemek-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss'],
})
export class EditReviewComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reviewId = this.route.snapshot.paramMap.get('id')!;
    this.getReviewById();
  }

  commentForm = this.formBuilder.group({
    image: [''],
    comment: ['', Validators.required],
  });
  isLoaded = false;
  reviewId = '';
  review!: Review;
  isLoading = false;
  ratingInput = 0;
  dataURI = '';

  getReviewById() {
    this.isLoading = true;
    this.reviewService.getReviewById(this.reviewId).subscribe((data) => {
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.review = data.data;
      this.isLoading = false;
      this.isLoaded = true;
    });
  }

  updateReview() {
    if (this.commentForm.invalid || this.dataURI === '') {
      this._snackBar.open('Lütfen tüm alanları doldurun.', 'Tamam', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;

    const review: Review = {
      id: '',
      comment: this.commentForm.value.comment,
      image: this.dataURI,
      rating: this.ratingInput,
    };

    this.reviewService
      .updateReviewById(this.reviewId, review)
      .subscribe((data) => {
        if (!data.isSuccessful) {
          this.isLoading = false;
          this._snackBar.open(data.message, 'Tamam', {
            duration: 2000,
          });
          return;
        }
        this.isLoading = false;
        this.router.navigate(['/review', this.reviewId]);
        this._snackBar.open('Yorumun başarıyla güncellendi.', 'Tamam', {
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
