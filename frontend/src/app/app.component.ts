import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn() {
    return this.auth.isTokenExpired();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
