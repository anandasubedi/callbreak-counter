import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.http.get(Globals.apiEndPointPrefix + 'users').subscribe(
      users => {
        console.log(users);
      }
    );
  }
  constructor(private http: HttpClient) {}
}
