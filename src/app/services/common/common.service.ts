import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = 'http://127.0.0.1:8008/';
  constructor(private http: HttpClient) { }
  get(target: string): Observable<any> {
    return this.http.get(this.baseUrl + target + '/list');
  }
  add(target: string, data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + target + '/add', null, {params: data}).pipe();
  }
  update(target: string, data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + target + '/update', null, {params: data}).pipe();
  }
  delete(target: string, data: HttpParams): Observable<any> {
    return this.http.delete(this.baseUrl + target + '/delete', {params: data}).pipe();
  }
  confirm(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'order/confirm', null, {params: data}).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    if (error !== null) {
      alert('Out of stock! Please check the stock! ');
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
