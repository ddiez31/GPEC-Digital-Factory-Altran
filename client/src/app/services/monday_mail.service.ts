import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MondayMailService {

  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http : Http) {}

  getMondayMails() : Observable < any > {
    return this
      .http
      .get('/api/monday_mails')
      .map(res => res.json());
  }

  countMondayMails() : Observable < any > {
    return this
      .http
      .get('/api/monday_mails/count')
      .map(res => res.json());
  }

  addMondayMail(monday_mail) : Observable < any > {
    return this
      .http
      .post('/api/monday_mail', JSON.stringify(monday_mail), this.options);
  }

  getMondayMail(monday_mail) : Observable < any > {
    return this
      .http
      .get(`/api/monday_mail/${monday_mail.id}`)
      .map(res => res.json());
  }

  editMondayMail(monday_mail) : Observable < any > {
    return this
      .http
      .put(`/api/monday_mail/${monday_mail.id}`, JSON.stringify(monday_mail), this.options);
  }

  deleteMondayMail(monday_mail) : Observable < any > {
    return this
      .http
      .delete(`/api/monday_mail/${monday_mail.id}`, this.options);
  }

}
