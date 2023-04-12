/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ReviewService } from '../../services/review.service';
import { Post } from '../../models/post.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Review } from '../../models/review.model';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'bedavayemek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  entryComponents: [PostDialogComponent],
})
export class HomeComponent implements OnInit {
  carouselConfig = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  showShareLink: { [key: string]: boolean } = {};
  showFullDescription = new Map<string, boolean>();

  isLoading = false;
  posts: Post[] = [];
  reviews: Review[] = [];
  constructor(
    private postService: PostService,
    private reviewService: ReviewService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog
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

  openPostDialog(postId: string) {
    // this.router.navigate(['/post', postId]);
    const dialogRef = this.dialog.open(PostDialogComponent, {
      data: {
        postId: postId,
      },
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  addComment(comment: string, postId: string) {
    const review: Review = {
      rating: 0,
      comment: comment,
      image: '',
    };

    console.log(postId);

    this.reviewService.addComment(review, postId).subscribe((data) => {
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
