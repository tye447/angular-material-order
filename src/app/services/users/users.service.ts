import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'http://127.0.0.1:8008/';
  constructor(private http: HttpClient) { }
  get(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + 'employee/list');
  }
  add(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'employee/add', null, {params: data}).pipe();
  }
  update(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'employee/update', null, {params: data}).pipe();
  }
  delete(data: HttpParams): Observable<any> {
    console.log(data);
    return this.http.delete(this.baseUrl + 'employee/delete', {params: data}).pipe();
  }
}
