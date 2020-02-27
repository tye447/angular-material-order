import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://127.0.0.1:8008/';
  constructor(private http: HttpClient) { }
  login(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'login', null, {params: data}).pipe();
  }
}
