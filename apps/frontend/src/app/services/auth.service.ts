import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3333/';

  registerService(auth: Auth): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'auth/register', auth);
  }
}
