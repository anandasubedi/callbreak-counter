import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from '../globals';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
    registerForm: FormGroup;

    ngOnInit() {

    this.registerForm = new FormGroup ({
        firstName: new FormControl('',Validators.required),
        lastName: new FormControl('',Validators.required),
        email: new FormControl('',Validators.email),
        username: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
    })
   
   }
   
   get firstName() { return this.registerForm.get('firstName'); }
   get lastName() { return this.registerForm.get('lastName'); }
   get email() { return this.registerForm.get('email'); }
   get username() { return this.registerForm.get('username'); }
   get password() { return this.registerForm.get('password'); }
   
   onSubmit() {
      if (this.registerForm.valid) {
        console.log(Globals.apiEndPoint);
      } else {
        console.log("Invalid Form");
    }
  
   
}
