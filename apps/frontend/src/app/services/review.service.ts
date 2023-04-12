import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Review } from '../models/review.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class ReviewService {
  constructor(private http: HttpClient) {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('accessToken')
    );
  }

  apiUrl = 'http://localhost:3333/api/';

  addComment(review: Review, postId: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      this.apiUrl + 'review/post/' + postId,
      review,
      httpOptions
    );
  }

  getReviewsByPostId(postId: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      this.apiUrl + 'review/post/' + postId,
      httpOptions
    );
  }
}
