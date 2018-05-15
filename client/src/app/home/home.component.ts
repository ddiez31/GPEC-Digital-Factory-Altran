import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {LowerCasePipe} from '@angular/common';

import {AuthService} from '../services/auth.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.scss']})
export class HomeComponent implements OnInit {
  // Email input to lowercase
  emailValue : string;
  changeEmail(emailValue : string) {
    this.emailValue = emailValue
  };

  // Form validators
  loginForm : FormGroup;
  email = new FormControl('', [
    Validators.email, Validators.required, Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(6),
    Validators.maxLength(6)
  ]);

  constructor(private auth : AuthService, private formBuilder : FormBuilder, private router : Router, public toast : ToastComponent) {}

  ngOnInit() {
    if (this.auth.loggedIn) {
      this
        .router
        .navigate(['/']);
    }
    this.loginForm = this
      .formBuilder
      .group({email: this.email, password: this.password});
  }

  setClassEmail() {
    return {
      'has-danger': !this.email.pristine && !this.email.valid
    };
  }
  setClassPassword() {
    return {
      'has-danger': !this.password.pristine && !this.password.valid
    };
  }

  login() {
    this
      .auth
      .login(this.loginForm.value)
      .subscribe(res => this.router.navigate(['/']), error => this.toast.setMessage('Email et/ou Mot de passe erroné(s)', 'danger'));
  }

}
