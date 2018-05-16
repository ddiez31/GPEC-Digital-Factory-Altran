import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {SkillService} from '../services/skill.service';
import {Type_skillService} from '../services/type_skill.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {LowerCasePipe} from '@angular/common';
import {UpperCasePipe} from '@angular/common';

@Component({selector: 'app-skills', templateUrl: './skills.component.html', styleUrls: ['./skills.component.scss']})
export class SkillsComponent implements OnInit {

  // Name input toTitlecase
  nameValue : string;
  changeName(nameValue : string) {
    this.nameValue = nameValue
  };

  skill = {};
  skills = [];
  type_skill = {};
  type_skills = [];

  isLoading = true;
  isEditing = false;
  isAdding = false;
  isChecked = false;

  // Form validators
  addSkillForm : FormGroup;
  name = new FormControl('', Validators.required);
  type_skill_id;

  public term: any;

  constructor(private skillService : SkillService, private type_skillService : Type_skillService, private formBuilder : FormBuilder, private http : Http, public toast : ToastComponent) {}

  ngOnInit() {
    this.getSkills();
    this.getTypeSkills();

     // Declare data form to check
    this.addSkillForm = this
      .formBuilder
      .group({
        name: this.name,
        type_skill_id: this.type_skill_id
      });
  }

  getSkills() {
    this
      .skillService
      .getSkills()
      .subscribe(data => this.skills = data, error => console.log(error), () => this.isLoading = false);
  }

  getTypeSkills() {
    this
      .type_skillService
      .getTypeSkills()
      .subscribe(data => this.type_skills = data, error => console.log(error), () => this.isLoading = false);
  }

  addSkill() {
    this
      .skillService
      .addSkill(this.addSkillForm.value)
      .subscribe(res => {
        const newSkill = res.json();
        this
          .skills
          .push(newSkill);
        this
          .addSkillForm
          .reset();
        this
          .toast
          .setMessage('Compétence ajoutée avec succès.', 'success');
        setTimeout(() => {
          this.isAdding = false;
        }, 1500);
        this.getSkills();
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
      .setMessage('Création annulée.', 'warning'); // reload the skills to reset the adding
    this.getSkills();
  }

  enableEditing(skill) {
    this.isEditing = true;
    this.skill = skill;
  }

  cancelEditing() {
    this.isEditing = false;
    this.isAdding = false;
    this.skill = {};
    this
      .toast
      .setMessage('Modification annulée.', 'warning'); // reload the skills to reset the editing
    this.getSkills();
  }

  editSkill(skill) {
    this
      .skillService
      .editSkill(skill)
      .subscribe(res => {
        this.isEditing = false;
        this.skill = skill;
        this
          .toast
          .setMessage('Modification enregistrée.', 'success');
        setTimeout(() => {
          this.getSkills();
        }, 10);
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de modification.', 'danger');
      });
  }

  enableDeleting(skill) {
    this.skill = skill;
  }

  deleteSkill() {
    this
      .skillService
      .deleteSkill(this.skill)
      .subscribe(res => {
        const pos = this
          .skills
          .map(elem => elem.id)
          .indexOf(this.skill['id']);
        this
          .skills
          .splice(pos, 1);
        this
          .toast
          .setMessage('Compétence supprimée avec succès.', 'success');
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de suppression.', 'danger');
      });
  }
}