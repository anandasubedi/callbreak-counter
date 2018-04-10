import {  AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpModule, RequestOptions} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './auth/token.interceptor';
import { Globals } from './globals';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
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
  providers: [
    forwardRef(() => Globals),
    RegisterService,
    AuthService,
    AuthGuard,
    // {
    //   provide: RequestOptions,
    //   useClass: AuthRequestOptions
    // }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
