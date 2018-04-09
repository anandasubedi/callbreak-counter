import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    const headers = new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'Content-Type': 'application/json'
    });
    request = request.clone({headers});
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: this.auth.getToken()
    //   }
    // });
    return next.handle(request);
  }
}
