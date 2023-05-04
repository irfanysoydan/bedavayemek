import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Post } from '../models/post.model';
import {
  CREATE_POST,
  DELETE_POST,
  GET_OWN_POSTS,
  GET_POSTS,
  GET_POST_BY_ID,
  UPDATE_POST,
} from '../graphql/post.graphql';
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
  CREATE_POST = CREATE_POST;
  GET_POSTS = GET_POSTS;
  GET_OWN_POSTS = GET_OWN_POSTS;
  GET_POST_BY_ID = GET_POST_BY_ID;
  DELETE_POST = DELETE_POST;
  UPDATE_POST = UPDATE_POST;

  createPost(post: Post): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.CREATE_POST,
        variables: {
          post,
        },
      })
      .pipe(
        map((result) => {
          return result.data.createPost;
        })
      );
  }

  getPosts(): Observable<ResponseModel> {
    return this.apollo
      .watchQuery<any>({
        query: this.GET_POSTS,
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.getPosts;
        })
      );
  }

  getOwnPosts(): Observable<ResponseModel> {
    return this.apollo
      .watchQuery<any>({
        query: this.GET_OWN_POSTS,
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.getOwnPosts;
        })
      );
  }

  getPostById(id: string): Observable<ResponseModel> {
    return this.apollo
      .watchQuery<any>({
        query: this.GET_POST_BY_ID,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.getPostById;
        })
      );
  }

  deletePost(id: string): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.DELETE_POST,
        variables: {
          id,
        },
      })
      .pipe(
        map((result) => {
          return result.data.deletePostById;
        })
      );
  }

  updatePostById(id: string, post: Post): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.UPDATE_POST,
        variables: {
          id,
          post,
        },
      })
      .pipe(
        map((result) => {
          return result.data.updatePostById;
        })
      );
  }
}
