import { AuthService } from './auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginFailure: boolean = null;
  registerSuccessMessage: String = null;
  loginErrorMessage: String = null;

  constructor(
     private router: Router,
     private authService: AuthService) {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.password);
      this.authService.login(
        { username: this.username.value, password: this.password.value })
        .subscribe(response => {
          if (response.auth) {
            this.authService.setToken(response.token);
            this.goToHomePage();
          }
        },
        error => {
          this.loginErrorMessage = error.error;
        });

    } else {
      // tslint:disable-next-line:forin
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsTouched();
      }
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.registerSuccessMessage = this.authService.registerSuccessMessage;
  }

  goToHomePage(): any {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authService.registerSuccessMessage = null;
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

}
