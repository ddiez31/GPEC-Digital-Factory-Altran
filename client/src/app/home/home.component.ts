import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {AuthService} from '../services/auth.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.scss']})
export class HomeComponent implements OnInit {
  // Form validators
  loginForm : FormGroup;
  surname = new FormControl('', [
    Validators.required, Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(3),
    Validators.maxLength(10)
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
      .group({surname: this.surname, password: this.password});
  }

  setClassSurname() {
    return {
      'has-danger': !this.surname.pristine && !this.surname.valid
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
