import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';

import {UserService} from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper : JwtHelper = new JwtHelper();

  currentUser = {
    id: '',
    surname: '',
    type_user_id: ''
  };

  constructor(private userService : UserService, private router : Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(surnameAndPassword) {
    return this
      .userService
      .login(surnameAndPassword)
      .map(res => res.json())
      .map(res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = {
      id: '',
      surname: '',
      type_user_id: ''
    };
    this
      .router
      .navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this
      .jwtHelper
      .decodeToken(token)
      .user;
  }

  setCurrentUser(user) {
    this.loggedIn = true;
    this.currentUser.id = user.id;
    this.currentUser.surname = user.surname;
    this.currentUser.type_user_id = user.type_user_id;
    user.type_user_id === 1
      ? this.isAdmin = true
      : this.isAdmin = false;
    delete user.type_user_id;
  }

}
