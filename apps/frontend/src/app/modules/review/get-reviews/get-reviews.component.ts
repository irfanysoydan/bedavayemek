/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'bedavayemek-get-reviews',
  templateUrl: './get-reviews.component.html',
  styleUrls: ['./get-reviews.component.scss'],
})
export class GetReviewsComponent implements OnInit {
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.getReviews();
  }

  post!: Post;
  reviews!: Review[];
  isLoaded = false;
  isLoading = false;

  getReviews() {
    this.isLoading = true;
    this.reviewService.getReviews().subscribe((data) => {
      console.log(data);
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.reviews = data.data;
      this.isLoading = false;
      this.isLoaded = true;
    });
  }

  deleteReview(id: string) {
    this.reviewService.deleteReviewById(id).subscribe((data) => {
      if (!data.isSuccessful) {
        return;
      }
      window.location.reload();
    });
  }
}
