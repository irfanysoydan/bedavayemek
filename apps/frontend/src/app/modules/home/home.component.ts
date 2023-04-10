/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'bedavayemek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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

  posts: Post[] = [];
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((data) => {
      console.log(data);
      if (!data.isSuccessful) {
        return;
      }
      this.posts = data.data;
    });
  }
}
