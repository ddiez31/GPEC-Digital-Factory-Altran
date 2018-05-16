import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {

  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http : Http) {}

  getSkills() : Observable < any > {
    return this
      .http
      .get('/api/skills')
      .map(res => res.json());
  }

  addSkill(skill) : Observable < any > {
    return this
      .http
      .post('/api/skill', JSON.stringify(skill), this.options);
  }

  getSkill(skill) : Observable < any > {
    return this
      .http
      .get(`/api/skill/${skill.id}`)
      .map(res => res.json());
  }

  editSkill(skill) : Observable < any > {
    return this
      .http
      .put(`/api/skills/${skill.id}`, JSON.stringify(skill), this.options);
  }

  deleteSkill(skill) : Observable < any > {
    return this
      .http
      .delete(`/api/skills/${skill.id}`, this.options);
  }

}