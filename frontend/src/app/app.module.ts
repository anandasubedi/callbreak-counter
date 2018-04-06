import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { Globals } from './globals';
import { AppComponent } from './app.component';
import {routing} from './app.routes';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';
import { RegisterService } from './auth/register.service';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    routing,
    HttpClientModule
  ],
  providers: [forwardRef(() => Globals), RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
