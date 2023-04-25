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
      data.data.forEach(
        (element: { post: { title: string | any[] }; title: string }) => {
          if (element.post.title.length > 25) {
            element.post.title = element.post.title.slice(0, 25) + '...';
          }
        }
      );
      this.reviews = data.data;
      this.isLoading = false;
      this.isLoaded = true;
    });
  }
}
