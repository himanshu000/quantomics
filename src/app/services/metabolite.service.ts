import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MetaboliteService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('MetaboliteService');
  }

  getMetabolites(url: string): Observable<any[]> {
    return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getMetabolites', []))
      );
  }
}
