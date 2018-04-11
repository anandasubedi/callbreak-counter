import { decode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

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

  ngOnInit(): void { }

}
