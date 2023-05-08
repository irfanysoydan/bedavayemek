import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Apollo } from 'apollo-angular';
import { CREATE_USER, GET_USER, LOGIN_USER } from '../graphql/auth.graphql';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  apiUrl = 'http://localhost:3333/api/';
  CREATE_USER = CREATE_USER;
  LOGIN_USER = LOGIN_USER;
  GET_USER = GET_USER;

  registerService(auth: Auth): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.CREATE_USER,
        variables: {
          auth,
        },
      })
      .pipe(
        map((result) => {
          return result.data.register;
        })
      );
  }

  loginService(auth: Auth): Observable<ResponseModel> {
    return this.apollo
      .mutate<any>({
        mutation: this.LOGIN_USER,
        variables: {
          auth,
        },
      })
      .pipe(
        map((result) => {
          return result.data.login;
        })
      );
  }

  getAuth(): Observable<ResponseModel> {
    return this.apollo
      .watchQuery<any>({
        query: this.GET_USER,
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.getAuth;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
