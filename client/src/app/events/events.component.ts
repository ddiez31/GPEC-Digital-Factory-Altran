import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {EventService} from '../services/event.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({selector: 'app-events', templateUrl: './events.component.html', styleUrls: ['./events.component.scss']})export class EventsComponent implements OnInit {
  event = {};
  events = [];
  isLoading = true;
  isEditing = false;
  addEventForm : FormGroup;
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

  constructor(private eventService : EventService, private formBuilder : FormBuilder, private http : Http, public toast : ToastComponent) {}
  ngOnInit() {
    this.getEvents();
    this.addEventForm = this
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
  getEvents() {
    this
      .eventService
      .getEvents()
      .subscribe(data => this.events = data, error => console.log(error), () => this.isLoading = false);
  }
  addEvent() {
    this
      .eventService
      .addEvent(this.addEventForm.value)
      .subscribe(res => {
        const newEvent = res.json();
        this
          .events
          .push(newEvent);
        this
          .addEventForm
          .reset();
        this
          .toast
          .setMessage('Evènement ajouté avec succès.', 'success');
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Cet évènement existe déjà.', 'danger');
      });
  }
  enableEditing(event) {
    this.isEditing = true;
    this.event = event;
  }
  cancelEditing() {
    this.isEditing = false;
    this.event = {};
    this
      .toast
      .setMessage('Modification annulée.', 'warning'); // reload the events to reset the editing
    this.getEvents();
  }
  editEvent(event) {
    this
      .eventService
      .editEvent(event)
      .subscribe(res => {
        this.isEditing = false;
        this.event = event;
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
  deleteEvent(event) {
    if (window.confirm('Voulez-vous réellement supprimer cette fiche?')) {
      this
        .eventService
        .deleteEvent(event)
        .subscribe(res => {
          const pos = this
            .events
            .map(elem => elem._id)
            .indexOf(event._id);
          this
            .events
            .splice(pos, 1);
          this
            .toast
            .setMessage('Evènement supprimé avec succès.', 'success');
        }, error => {
          console.log(error);
          this
            .toast
            .setMessage('Erreur de suppression.', 'danger');
        });
    }
  }
}