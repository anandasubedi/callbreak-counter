import { FormControl } from '@angular/forms';
import { Globals } from './../globals';
import { User } from './User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RegisterService {

  registerUrl = Globals.apiEndPointPrefix + 'auth/register';
  loginUrl = Globals.apiEndPointPrefix + 'auth/login';
  registerSuccessMessage = null;
  constructor(private http: HttpClient) { }

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
    console.log(user);
    return this.http.post(this.loginUrl, user, httpOptions)
      .pipe(
        tap((loginUser: User) => console.log('User Logged in', user))
      );
  }

  setRegisterSuccessMessage(message) {
    this.registerSuccessMessage = message;
  }
}
