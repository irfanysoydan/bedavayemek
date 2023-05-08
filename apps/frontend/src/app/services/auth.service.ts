import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Apollo } from 'apollo-angular';
import {
  CREATE_USER,
  GET_USER,
  LOGIN_USER,
  UPDATE_USER_PROFILE,
} from '../graphql/auth.graphql';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  apiUrl = 'http://localhost:3333/api/';
  CREATE_USER = CREATE_USER;
  LOGIN_USER = LOGIN_USER;
  GET_USER = GET_USER;
  UPDATE_USER_PROFILE = UPDATE_USER_PROFILE;
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

  updateUserProfile(username: string, auth: Auth): Observable<ResponseModel> {
    console.log(auth);
    return this.apollo
      .mutate<any>({
        mutation: this.UPDATE_USER_PROFILE,
        variables: {
          username,
          auth,
        },
      })
      .pipe(
        map((result) => {
          return result.data.updateUserProfile;
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
