import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultantService {

  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http : Http) {}

  getConsultants() : Observable < any > {
    return this
      .http
      .get('/api/consultants')
      .map(res => res.json());
  }

  addConsultant(consultant) : Observable < any > {
    return this
      .http
      .post('/api/consultant', JSON.stringify(consultant), this.options);
  }

  getConsultant(consultant) : Observable < any > {
    return this
      .http
      .get(`/api/consultant/${consultant.id}`)
      .map(res => res.json());
  }

  editConsultant(consultant) : Observable < any > {
    return this
      .http
      .put(`/api/consultants/${consultant.id}`, JSON.stringify(consultant), this.options);
  }

  deleteConsultant(consultant) : Observable < any > {
    return this
      .http
      .delete(`/api/consultants/${consultant.id}`, this.options);
  }

}