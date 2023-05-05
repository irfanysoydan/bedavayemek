import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Review } from '../models/review.model';
import { Apollo } from 'apollo-angular';
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  GET_OWN_REVIEWS,
  GET_REVIEWS_BY_POST_ID,
  GET_REVIEW_BY_ID,
  UPDATE_REVIEW,
} from '../graphql/review.graphql';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class ReviewService {
  constructor(private http: HttpClient, private apollo: Apollo) {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('accessToken')
    );
  }

  apiUrl = 'http://localhost:3333/api/';
  CREATE_REVIEW = CREATE_REVIEW;
  GET_REVIEWS_BY_POST_ID = GET_REVIEWS_BY_POST_ID;
  GET_OWN_REVIEWS = GET_OWN_REVIEWS;
  GET_REVIEW_BY_ID = GET_REVIEW_BY_ID;
  DELETE_REVIEW = DELETE_REVIEW;
  UPDATE_REVIEW = UPDATE_REVIEW;

  createReview(review: Review, postId: string): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.CREATE_REVIEW,
        variables: {
          review,
          postId,
        },
      })
      .pipe(
        map((result) => {
          return result.data.createReview;
        })
      );
  }

  getReviewsByPostId(postId: string): Observable<ResponseModel> {
    return this.apollo
      .watchQuery<any>({
        query: this.GET_REVIEWS_BY_POST_ID,
        variables: {
          postId,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.getReviewsByPostId;
        })
      );
  }

  getReviewById(id: string): Observable<ResponseModel> {
    return this.apollo
      .watchQuery<any>({
        query: this.GET_REVIEW_BY_ID,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.getReviewById;
        })
      );
  }

  getReviews(): Observable<ResponseModel> {
    return this.apollo
      .watchQuery<any>({
        query: this.GET_OWN_REVIEWS,
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.getOwnReviews;
        })
      );
  }

  deleteReviewById(id: string): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.DELETE_REVIEW,
        variables: {
          id,
        },
      })
      .pipe(
        map((result) => {
          return result.data.deleteReviewById;
        })
      );
  }

  updateReviewById(id: string, review: Review): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.UPDATE_REVIEW,
        variables: {
          id,
          review,
        },
      })
      .pipe(
        map((result) => {
          return result.data.updateReviewById;
        })
      );
  }
}
