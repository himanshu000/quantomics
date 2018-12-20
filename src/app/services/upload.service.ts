import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadUrl = 'https://fe-assignment.herokuapp.com/metabolite_info/';
  constructor(
    private http: HttpClient,
    private messenger: MessageService) {}

    upload(file: File): Observable<any> {
      if (!file) { return; }

      const req = new HttpRequest('POST', this.uploadUrl, file, {
        reportProgress: true
      });

      return this.http.request(req).pipe(
        map(event => this.getEventMessage(event, file)),
        tap(message => this.showProgress(message)),
        last(),
        catchError(this.handleError(file))
      );
    }

    private getEventMessage(event: HttpEvent<any>, file: File) {
      switch (event.type) {
        case HttpEventType.Sent:
          return `Uploading file "${file.name}" of size ${file.size}.`;

        case HttpEventType.UploadProgress:
          const percentDone = Math.round(100 * event.loaded / event.total);
          return `File "${file.name}" is ${percentDone}% uploaded.`;

        case HttpEventType.Response:
          return {msg: `File "${file.name}" was completely uploaded!`, data: event.body};

        default:
          return `File "${file.name}" surprising upload event: ${event.type}.`;
      }
    }
    private handleError(file: File) {
      const userMessage = `${file.name} upload failed.`;

      return (error: HttpErrorResponse) => {
        const message = (error.error instanceof Error) ?
          error.error.message :
         `server returned code ${error.status} with body "${error.error}"`;

        this.messenger.add(`${userMessage} ${message}`);

        return of(userMessage);
      };
    }

    private showProgress(message: any) {
      if (typeof(message) === 'string') {
        this.messenger.add(message);
      } else {
        this.messenger.add(message.msg);
      }
    }
}
