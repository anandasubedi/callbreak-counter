import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': this.auth.getToken(),
      'Content-Type': 'application/json'
    });
    this.http.get(Globals.apiEndPointPrefix + 'users', { headers }).subscribe(
      users => { console.log(users); },
      error => { console.log(error); }
    );
  }
  constructor(private http: HttpClient, private auth: AuthService) { }
}
