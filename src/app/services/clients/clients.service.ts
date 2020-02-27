import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  baseUrl = 'http://127.0.0.1:8008/';
  constructor(private http: HttpClient) { }
  get(): Observable<any> {
    return this.http.get(this.baseUrl + 'client/list');
  }
  add(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'client/add', null, {params: data}).pipe();
  }
  update(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'client/update', null, {params: data}).pipe();
  }
  delete(data: HttpParams): Observable<any> {
    console.log(data);
    return this.http.delete(this.baseUrl + 'client/delete', {params: data}).pipe();
  }
}
