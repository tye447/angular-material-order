import {Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  baseUrl = 'http://127.0.0.1:8008/';
  http: HttpClient;
  router: Router;
  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }
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
    return this.http.post(this.baseUrl + 'commande/confirm', null, {params: data}).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    if (error !== null) {
      alert('Out of stock! Please check the stock! ');
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  login(data: HttpParams): Observable<any> {
    return this.http.post(this.baseUrl + 'login', null, {params: data}).pipe();
  }

  switch(target) {
    this.router.navigateByUrl('home').then(() => {
      this.router.navigateByUrl('home/' + target).then();
    });
  }
}
