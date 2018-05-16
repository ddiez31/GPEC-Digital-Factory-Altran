import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ConsultantService} from '../services/consultant.service';
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

  // user = {};
  // users = [];
  // type_user = {};
  // type_users = [];
  consultant = {};
  consultants = [];
  // contribution = {};
  // contributions = [];
  isLoading = true;
  isEditing = false;
  isAdding = false;
  isChecked = false;

  // Form validators
  addConsultantForm : FormGroup;
  first_name = new FormControl('', Validators.required);
  last_name = new FormControl('', Validators.required);

  // type_user_id;

  public term: any;
  
  constructor(private consultantService : ConsultantService, private formBuilder : FormBuilder, private http : Http, public toast : ToastComponent) {}

  ngOnInit() {
    this.getConsultants();
    // this.getTypeUsers();
    // this.getContributions();

     // Declare data form to check
    this.addConsultantForm = this
      .formBuilder
      .group({
        first_name: this.first_name,
        last_name: this.last_name

        // type_user_id: this.type_user_id
      });
  }

  getConsultants() {
    this
      .consultantService
      .getConsultants()
      .subscribe(data => this.consultants = data, error => console.log(error), () => this.isLoading = false);
  }


  // getContributions() {
  //   this
  //     .contributionService
  //     .getContributions()
  //     .subscribe(data => this.contributions = data, error => console.log(error), () => this.isLoading = false);
  // }

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
    this.isAdding = true;
  }

  cancelAdding() {
    this.isEditing = false;
    this.isAdding = false;
    this
      .toast
      .setMessage('Création annulée.', 'warning'); // reload the consultants to reset the adding
    this.getConsultants();
  }

  enableEditing(consultant) {
    this.isEditing = true;
    this.consultant = consultant;
    // this.isChecked = true;
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