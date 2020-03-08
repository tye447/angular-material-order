import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = 'http://127.0.0.1:8008/';
  constructor(private http: HttpClient) { }
  get(): Observable<any> {
    return this.http.get(this.baseUrl + 'commande/list');
  }
  add(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'commande/add', null, {params: data}).pipe();
  }
  update(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'commande/update', null, {params: data}).pipe();
  }
  delete(data: HttpParams): Observable<any> {
    return this.http.delete(this.baseUrl + 'commande/delete', {params: data}).pipe();
  }
}
