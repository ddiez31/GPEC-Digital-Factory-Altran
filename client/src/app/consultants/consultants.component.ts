import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ConsultantService} from '../services/consultant.service';
import {ProjectService} from '../services/project.service';
import {LevelService} from '../services/level.service';
import {SkillService} from '../services/skill.service';

import {ToastComponent} from '../shared/toast/toast.component';
import {LowerCasePipe} from '@angular/common';
import {UpperCasePipe} from '@angular/common';

@Component({selector: 'app-consultants', templateUrl: './consultants.component.html', styleUrls: ['./consultants.component.scss']})
export class ConsultantsComponent implements OnInit {

  // First_name input toTitlecase, Last_name input toUppercase
  first_nameValue : string;
  last_nameValue : string;
  changeFirst_name(first_nameValue : string) {
    this.first_nameValue = first_nameValue
  };
  changeLast_name(last_nameValue : string) {
    this.last_nameValue = last_nameValue;
  };

  consultant = {};
  consultants = [];
  project = {};
  projects = [];
  skill = {};
  skills = [];
  level = {};
  levels = [];

  isLoading = true;
  isEditing = false;
  isAdding = false;
  isViewing = false;

  // Form validators
  addConsultantForm : FormGroup;
  first_name = new FormControl('', Validators.required);
  last_name = new FormControl('', Validators.required);

  skill_id;
  level_id;

  public term: any;

  constructor(private consultantService : ConsultantService, private projectService : ProjectService, private levelService : LevelService, private skillService : SkillService, private formBuilder : FormBuilder, private http : Http, public toast : ToastComponent) {}

  ngOnInit() {
    this.getConsultants();
    this.getProjects();
    this.getSkills();
    this.getLevels();

     // Declare data form to check
    this.addConsultantForm = this
      .formBuilder
      .group({
        first_name: this.first_name,
        last_name: this.last_name,
        skill_id: this.skill_id,
        level_id: this.level_id
      });
  }

  getConsultants() {
    this
      .consultantService
      .getConsultants()
      .subscribe(data => this.consultants = data, error => console.log(error), () => this.isLoading = false);
  }

  getProjects() {
    this
      .projectService
      .getProjects()
      .subscribe(data => this.projects = data, error => console.log(error), () => this.isLoading = false);
  }

  getLevels() {
    this
      .levelService
      .getLevels()
      .subscribe(data => this.levels = data, error => console.log(error), () => this.isLoading = false);
  }

  getSkills() {
    this
      .skillService
      .getSkills()
      .subscribe(data => this.skills = data, error => console.log(error), () => this.isLoading = false);
  }

  addConsultant() {
    this
      .consultantService
      .addConsultant(this.addConsultantForm.value)
      .subscribe(res => {
        const newConsultant = res.json();
        this
          .consultants
          .push(newConsultant);
        this
          .addConsultantForm
          .reset();
        this
          .toast
          .setMessage('Consultant ajouté avec succès.', 'success');
        setTimeout(() => {
          this.isAdding = false;
        }, 1500);
        this.getConsultants();
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Vos informations comportent des erreurs, veuillez vérifier les données.', 'danger');
      });
  }

  enableAdding() {
    this.isEditing = false;
    this.isViewing = false;
    this.isAdding = true;
  }

  cancelAdding() {
    this.isEditing = false;
    this.isViewing = false;
    this.isAdding = false;
    this
      .toast
      .setMessage('Création annulée.', 'warning'); // reload the consultants to reset the adding
    this.getConsultants();
  }

  enableViewing(consultant) {
    this.isViewing = true;
    this.consultant = consultant;
  }

  cancelViewing() {
    this.isViewing = false;
  }

  enableEditing(consultant) {
    this.isEditing = true;
    this.consultant = consultant;
  }

  cancelEditing() {
    this.isEditing = false;
    this.isAdding = false;
    this.consultant = {};
    this
      .toast
      .setMessage('Modification annulée.', 'warning'); // reload the consultants to reset the editing
    this.getConsultants();
  }

  editConsultant(consultant) {
    this
      .consultantService
      .editConsultant(consultant)
      .subscribe(res => {
        this.isEditing = false;
        this.consultant = consultant;
        this
          .toast
          .setMessage('Modification enregistrée.', 'success');
        setTimeout(() => {
          this.getConsultants();
        }, 10);
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de modification.', 'danger');
      });
  }

  enableDeleting(consultant) {
    this.consultant = consultant;
  }

  deleteConsultant() {
    this
      .consultantService
      .deleteConsultant(this.consultant)
      .subscribe(res => {
        const pos = this
          .consultants
          .map(elem => elem.id)
          .indexOf(this.consultant['id']);
        this
          .consultants
          .splice(pos, 1);
        this
          .toast
          .setMessage('Consultant supprimé avec succès.', 'success');
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de suppression.', 'danger');
      });
  }
}