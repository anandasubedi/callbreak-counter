import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // get the token from a service
        const token: string = this.authService.getToken();
        console.log(token);
        // add it if we have one
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', token) });
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        // setting the accept header
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        console.log(req);
        return next.handle(req);
    }
}
