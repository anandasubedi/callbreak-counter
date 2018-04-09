import { User } from './User';
import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from '../globals';
import { Router } from '@angular/router';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


    registerForm: FormGroup;
    user: User;
    registerErorMessage: String;

    constructor(private registerService: RegisterService, private router: Router) {

    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.user = Object.assign({}, this.registerForm.value);
            this.registerService.register(this.user)
            .subscribe(user => {
                this.registerService.setRegisterSuccessMessage('Successfully Registered');
                this.goToLogin();
            }, error => {
                console.log(error);
                this.registerErorMessage = error.error;
            }
        );

        } else {
            // tslint:disable-next-line:forin
            for (const i in this.registerForm.controls) {
                this.registerForm.controls[i].markAsTouched();
            }
        }
    }

    goToLogin(): any {
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    get firstName() { return this.registerForm.get('firstName'); }
    get lastName() { return this.registerForm.get('lastName'); }
    get email() { return this.registerForm.get('email'); }
    get username() { return this.registerForm.get('username'); }
    get password() { return this.registerForm.get('password'); }
}
