import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {MondayMailService} from '../services/monday_mail.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({selector: 'app-monday_mail', templateUrl: './monday_mail.component.html', styleUrls: ['./monday_mail.component.scss']})export class MondayMailComponent implements OnInit {
  monday_mail = {};
  monday_mails = [];
  isLoading = true;
  isEditing = false;
  addMondayMailForm : FormGroup;
  name = new FormControl('', Validators.required);
  speaker = new FormControl('', Validators.required);
  image = new FormControl('');
  description = new FormControl('', Validators.required);
  num_places = new FormControl('', Validators.required);
  points = new FormControl('', Validators.required);

  // company_name = new FormControl('', Validators.required); company_job = new
  // FormControl('', Validators.required); company_business_revenue = new
  // FormControl('', Validators.required); num_employee = new FormControl('',
  // Validators.required); other_function = new FormControl('',
  // Validators.required); contribution_id = new FormControl('',
  // Validators.required); points = new FormControl('', Validators.required);
  // type_user_id = new FormControl('', Validators.required); hobby = new
  // FormControl('', Validators.required); description = new FormControl('',
  // Validators.required);

  constructor(private monday_mailService : MondayMailService, private formBuilder : FormBuilder, private http : Http, public toast : ToastComponent) {}
  ngOnInit() {
    this.getMondayMails();
    this.addMondayMailForm = this
      .formBuilder
      .group({
        name: this.name,
        speaker: this.speaker,
        image: this.image,
        description: this.description,
        num_places: this.num_places,
        points: this.points // company_name: this.company_name, company_job: this.company_job,
        // company_business_revenue: this.company_business_revenue, num_employee:
        // this.num_employee, other_function: this.other_function, contribution_id:
        // this.contribution_id, points: this.points, type_user_id: this.type_user_id,
        // hobby: this.hobby, description: this.description
      });
  }
  upload() {
    console.log(this.image);
  }
  getMondayMails() {
    this
      .monday_mailService
      .getMondayMails()
      .subscribe(data => this.monday_mails = data, error => console.log(error), () => this.isLoading = false);
  }
  addMondayMail() {
    this
      .monday_mailService
      .addMondayMail(this.addMondayMailForm.value)
      .subscribe(res => {
        const newMondayMail = res.json();
        this
          .monday_mails
          .push(newMondayMail);
        this
          .addMondayMailForm
          .reset();
        this
          .toast
          .setMessage('Information ajoutés avec succès.', 'success');
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Cette information existe déjà.', 'danger');
      });
  }
  enableEditing(monday_mail) {
    this.isEditing = true;
    this.monday_mail = monday_mail;
  }
  cancelEditing() {
    this.isEditing = false;
    this.monday_mail = {};
    this
      .toast
      .setMessage('Modification annulée.', 'warning'); // reload the monday_mails to reset the editing
    this.getMondayMails();
  }
  editMondayMail(monday_mail) {
    this
      .monday_mailService
      .editMondayMail(monday_mail)
      .subscribe(res => {
        this.isEditing = false;
        this.monday_mail = monday_mail;
        this
          .toast
          .setMessage('Modification enregistrée.', 'success');
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de modification.', 'danger');
      });
  }
  deleteMondayMail(monday_mail) {
    if (window.confirm('Voulez-vous réellement supprimer cette fiche?')) {
      this
        .monday_mailService
        .deleteMondayMail(monday_mail)
        .subscribe(res => {
          const pos = this
            .monday_mails
            .map(elem => elem._id)
            .indexOf(monday_mail._id);
          this
            .monday_mails
            .splice(pos, 1);
          this
            .toast
            .setMessage('Information supprimée avec succès.', 'success');
        }, error => {
          console.log(error);
          this
            .toast
            .setMessage('Erreur de suppression.', 'danger');
        });
    }
  }

  sendMondayMail() {
    console.log('envoyé');
  }
}