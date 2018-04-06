import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailure: boolean = null;

  constructor(private registerService: RegisterService, private router: Router) {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.password);
      this.registerService.login(
        { username: this.username.value, password: this.password.value })
        .subscribe(user => {
          if (user) {
            this.goToHomePage();
          } else {
            this.loginFailure = true;
          }
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
  }

  goToHomePage(): any {
    this.router.navigate(['/']);
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

}
