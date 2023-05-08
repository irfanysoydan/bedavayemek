/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bedavayemek-get-posts',
  templateUrl: './get-posts.component.html',
  styleUrls: ['./get-posts.component.scss'],
})
export class GetPostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  showShareLink: { [key: string]: boolean } = {};
  showFullDescription = new Map<string, boolean>();
  isLoading = false;
  isLoaded = false;
  posts!: Post[];

  getPosts() {
    this.isLoading = true;
    this.postService.getOwnPosts().subscribe((data) => {
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.posts = data.data;
      this.isLoading = false;
      this.isLoaded = true;
    });
  }

  deletePost(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe((data) => {
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
      window.location.reload();
      this.isLoading = false;
    });
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
