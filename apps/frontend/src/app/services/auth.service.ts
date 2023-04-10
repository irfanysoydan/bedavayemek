import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3333/api/';

  registerService(auth: Auth): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiUrl + 'auth/register', auth);
  }

  loginService(auth: Auth): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiUrl + 'auth/login', auth);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
