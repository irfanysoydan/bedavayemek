import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('accessToken')
    );
  }

  apiUrl = 'http://localhost:3333/api/';

  getPosts(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.apiUrl + 'post', httpOptions);
  }
}
