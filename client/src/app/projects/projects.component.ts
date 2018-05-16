import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ProjectService} from '../services/project.service';
import {LevelService} from '../services/level.service';
import {SkillService} from '../services/skill.service';

import {ToastComponent} from '../shared/toast/toast.component';
import {LowerCasePipe} from '@angular/common';
import {UpperCasePipe} from '@angular/common';

@Component({selector: 'app-projects', templateUrl: './projects.component.html', styleUrls: ['./projects.component.scss']})
export class ProjectsComponent implements OnInit {

  // Name input toUppercase
  nameValue : string;
  changeName(nameValue : string) {
    this.nameValue = nameValue;
  };

  project = {};
  projects = [];
  skill = {};
  skills = [];
  level = {};
  levels = [];

  isLoading = true;
  isEditing = false;
  isAdding = false;
  isChecked = false;

  // Form validators
  addProjectForm : FormGroup;
  name = new FormControl('', Validators.required);

  skill_id;
  level_id;
  
  public term: any;

  constructor(private projectService : ProjectService, private levelService : LevelService, private skillService : SkillService, private formBuilder : FormBuilder, private http : Http, public toast : ToastComponent) {}

  ngOnInit() {
    this.getProjects();
    this.getSkills();
    this.getLevels();

     // Declare data form to check
    this.addProjectForm = this
      .formBuilder
      .group({
        name: this.name,
        skill_id: this.skill_id,
        level_id: this.level_id
      });
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

  addProject() {
    this
      .projectService
      .addProject(this.addProjectForm.value)
      .subscribe(res => {
        const newProject = res.json();
        this
          .projects
          .push(newProject);
        this
          .addProjectForm
          .reset();
        this
          .toast
          .setMessage('Projet ajouté avec succès.', 'success');
        setTimeout(() => {
          this.isAdding = false;
        }, 1500);
        this.getProjects();
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Vos informations comportent des erreurs, veuillez vérifier les données.', 'danger');
      });
  }

  enableAdding() {
    this.isEditing = false;
    this.isAdding = true;
  }

  cancelAdding() {
    this.isEditing = false;
    this.isAdding = false;
    this
      .toast
      .setMessage('Création annulée.', 'warning'); // reload the projects to reset the adding
    this.getProjects();
  }

  enableEditing(project) {
    this.isEditing = true;
    this.project = project;
  }

  cancelEditing() {
    this.isEditing = false;
    this.isAdding = false;
    this.project = {};
    this
      .toast
      .setMessage('Modification annulée.', 'warning'); // reload the projects to reset the editing
    this.getProjects();
  }

  editProject(project) {
    this
      .projectService
      .editProject(project)
      .subscribe(res => {
        this.isEditing = false;
        this.project = project;
        this
          .toast
          .setMessage('Modification enregistrée.', 'success');
        setTimeout(() => {
          this.getProjects();
        }, 10);
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de modification.', 'danger');
      });
  }

  enableDeleting(project) {
    this.project = project;
  }

  deleteProject() {
    this
      .projectService
      .deleteProject(this.project)
      .subscribe(res => {
        const pos = this
          .projects
          .map(elem => elem.id)
          .indexOf(this.project['id']);
        this
          .projects
          .splice(pos, 1);
        this
          .toast
          .setMessage('Projet supprimé avec succès.', 'success');
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de suppression.', 'danger');
      });
  }
}