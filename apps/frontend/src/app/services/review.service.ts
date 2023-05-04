import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Review } from '../models/review.model';
import { Apollo } from 'apollo-angular';
import { GET_REVIEWS_BY_POST_ID } from '../graphql/review.graphql';

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
  GET_REVIEWS_BY_POST_ID = GET_REVIEWS_BY_POST_ID;

  createReview(review: Review, postId: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      this.apiUrl + 'review/post/' + postId,
      review,
      httpOptions
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

  getReviewById(reviewId: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      this.apiUrl + 'review/' + reviewId,
      httpOptions
    );
  }

  getReviews(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.apiUrl + 'review', httpOptions);
  }

  updateReviewById(id: string, review: Review): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      this.apiUrl + 'review/' + id,
      review,
      httpOptions
    );
  }
}
