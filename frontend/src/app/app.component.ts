import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn() {
    return !this.auth.isTokenExpired();
  }

  loggedInName() {
    if (this.isLoggedIn()) {
      const token = localStorage.getItem('token');
      // decode the token to get its payload
      const tokenPayload = decode(token);

      return tokenPayload.username;
    }
    return null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
