import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http : Http) {}

  login(credentials) : Observable < any > {
    return this
      .http
      .post('/api/login', JSON.stringify(credentials), this.options);
  }
  getUsers() : Observable < any > {
    return this
      .http
      .get('/api/users')
      .map(res => res.json());
  }

  addUser(user) : Observable < any > {
    return this
      .http
      .post('/api/user', JSON.stringify(user), this.options);
  }

  getUser(user) : Observable < any > {
    return this
      .http
      .get(`/api/user/${user.id}`)
      .map(res => res.json());
  }

  editUser(user) : Observable < any > {
    return this
      .http
      .put(`/api/users/${user.id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user) : Observable < any > {
    return this
      .http
      .delete(`/api/users/${user.id}`, this.options);
  }

}