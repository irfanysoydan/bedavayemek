import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'bedavayemek-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit {
  reviews: Review[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      postId: string;
    },
    public dialogRef: MatDialogRef<PostDialogComponent>,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.getReviewsByPostId(this.data.postId);
  }

  getReviewsByPostId(postId: string) {
    console.log(postId);
    this.reviewService.getReviewsByPostId(postId).subscribe((data) => {
      if (!data.isSuccessful) {
        return;
      }

      console.log(data);
      this.reviews = data.data;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
