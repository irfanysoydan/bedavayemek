import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { Apollo } from 'apollo-angular';
import { CREATE_USER, LOGIN_USER } from '../graphql/auth.graphql';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  apiUrl = 'http://localhost:3333/api/';
  CREATE_USER = CREATE_USER;
  LOGIN_USER = LOGIN_USER;

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
