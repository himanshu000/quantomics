import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MetaboliteService {
  metaboiltesUrl = 'https://s3-us-west-2.amazonaws.com/mithoo-public-data/metabolite_info.json';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('MetaboliteService');
  }

  getMetabolites(): Observable<any[]> {
    return this.http.get<any[]>(this.metaboiltesUrl)
      .pipe(
        catchError(this.handleError('getMetabolites', []))
      );
  }
}
