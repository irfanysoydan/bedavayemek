/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ReviewService } from '../../services/review.service';
import { Post } from '../../models/post.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Review } from '../../models/review.model';

@Component({
  selector: 'bedavayemek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showShareLink: { [key: string]: boolean } = {};
  showFullDescription = new Map<string, boolean>();

  isLoading = false;
  posts: Post[] = [];
  reviews: Review[] = [];
  constructor(
    private postService: PostService,
    private reviewService: ReviewService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
    console.log(this.isLoading);
    this.postService.getPosts().subscribe((data) => {
      console.log(data);
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.posts = data.data;
      this.isLoading = false;
    });
  }

  getReviewsByPostId(postId: string) {
    this.reviewService.getReviewsByPostId(postId).subscribe((data) => {
      if (!data.isSuccessful) {
        return;
      }

      console.log(postId);
      console.log(data);
      this.reviews = data.data;
    });
  }

  createReview(comment: string, postId: string) {
    const review: Review = {
      rating: 0,
      comment: comment,
      image: '',
    };

    console.log(postId);

    this.reviewService.createReview(review, postId).subscribe((data) => {
      if (!data.isSuccessful) {
        this._snackBar.open(data.message, 'Tamam', {
          duration: 2000,
        });
        return;
      }
      this._snackBar.open('Yorumunuz başarıyla eklendi', 'Tamam', {
        duration: 2000,
      });
    });

    this.showShareLink[postId] = false;
  }

  showFullDescriptionClicked(postId: string): void {
    this.showFullDescription.set(postId, true);
    this.cdr.detectChanges();

    const button = document.querySelector(`#button-${postId}`);
    if (button) {
      button.remove();
    }
  }

  onInputChange(event: any, postId: string) {
    this.showShareLink[postId] = event.target.value !== '';
  }
}
