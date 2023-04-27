import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Post } from '../models/post.model';
import { GET_POSTS } from '../graphql/post.graphql';
import { Apollo } from 'apollo-angular';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private apollo: Apollo) {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('accessToken')
    );
  }

  apiUrl = 'http://localhost:3333/api/';
  GET_POSTS = GET_POSTS;

  getPosts(): Observable<ResponseModel> {
    const posts = this.apollo
      .query<any>({
        query: this.GET_POSTS,
      })
      .pipe(map((result) => result.data.getPosts));
    console.log(posts);
    return posts;

    // return this.http.get<ResponseModel>(this.apiUrl + 'post', httpOptions);
  }

  getOwnPosts(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.apiUrl + 'post/own', httpOptions);
  }

  getPostById(id: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      this.apiUrl + 'post/' + id,
      httpOptions
    );
  }

  createPost(post: Post): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      this.apiUrl + 'post',
      post,
      httpOptions
    );
  }

  updatePostById(id: string, post: Post): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      this.apiUrl + 'post/' + id,
      post,
      httpOptions
    );
  }

  deletePost(id: string): Observable<ResponseModel> {
    console.log(httpOptions);
    return this.http.patch<ResponseModel>(
      this.apiUrl + 'post/' + id,
      httpOptions
    );
  }
}
