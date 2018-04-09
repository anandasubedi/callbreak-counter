import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './User';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { Globals } from '../globals';

export const TOKEN_NAME = 'jwt_token';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

    private registerUrl: string = Globals.apiEndPointPrefix + 'auth/register';
    private loginUrl: string = Globals.apiEndPointPrefix + 'auth/login';
    registerSuccessMessage: string = null;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getToken(): string {
        return localStorage.getItem(TOKEN_NAME);
    }

    setToken(token: string): void {
        localStorage.setItem(TOKEN_NAME, token);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        console.log('decoded', decoded);
        if (decoded.exp === undefined) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        token = token ? token : this.getToken();
        if (!token) {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }

    register(user: User): Observable<User> {
        return this.http.post(this.registerUrl, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password
        }, httpOptions)
            .pipe(
                tap((registerdUser: User) => console.log('User registered'))
            );
    }

    login(user: any): any {
        return this.http.post(this.loginUrl, user, httpOptions)
            .pipe(
                tap((loginUser: User) => console.log('User Logged in', user))
            );
    }

    logout(): any {
        localStorage.removeItem(TOKEN_NAME);
    }
    setRegisterSuccessMessage(message) {
        this.registerSuccessMessage = message;
      }

}
