/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Review } from '../../../models/review.model';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'bedavayemek-get-review-details',
  templateUrl: './get-review-details.component.html',
  styleUrls: ['./get-review-details.component.scss'],
})
export class GetReviewDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.reviewId = this.route.snapshot.paramMap.get('id')!;
    this.getReviewById(this.reviewId);
  }

  isLoaded = false;
  reviewId = '';
  isLoading = false;
  post!: Post;
  review!: Review;

  getReviewById(reviewId: string) {
    this.isLoading = true;
    this.reviewService.getReviewById(reviewId).subscribe((data) => {
      console.log(data);
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.review = data.data;
      this.isLoading = false;
      this.isLoaded = true;
    });
  }
}
