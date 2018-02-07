import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Http, Request, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';

@Injectable()
export class AuthorizedHttp extends Http {

  constructor(
      _backend: ConnectionBackend, 
      _defaultOptions: RequestOptions, 
      private authService: AuthService) {
    super(_backend, _defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = this.authService.tokenSubject$.getValue();
    if (typeof url === 'string') { 
      if (!options) {
        options = {headers: new Headers()}
      }
      options.headers.set('Authorization', token);
    } else {
      url.headers.set('Authorization', token);
    }
    return super.request(url, options);
  }

}