/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'bedavayemek-get-post-details',
  templateUrl: './get-post-details.component.html',
  styleUrls: ['./get-post-details.component.scss'],
})
export class GetPostDetailsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.getPostById(this.postId);
  }

  postId = '';
  post!: Post;
  reviews: Review[] = [];
  isLoading = false;

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
}
