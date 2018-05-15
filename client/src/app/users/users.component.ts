import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {UserService} from '../services/user.service';
import {Type_userService} from '../services/type_user.service';
import {ContributionService} from '../services/contribution.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {LowerCasePipe} from '@angular/common';
import {UpperCasePipe} from '@angular/common';
const URL = 'http://localhost:3000/api/upload';

@Component({selector: 'app-users', templateUrl: './users.component.html', styleUrls: ['./users.component.scss']})
export class UsersComponent implements OnInit {
  private urlPublic = 'http://localhost:3000/uploads/';
  public uploader : FileUploader = new FileUploader({url: URL, itemAlias: 'avatar'});

  // First_name input toTitlecase, Last_name input toUppercase, Email input
  // toLowercase
  first_nameValue : string;
  last_nameValue : string;
  emailValue : string;
  changeFirst_name(first_nameValue : string) {
    this.first_nameValue = first_nameValue
  };
  changeLast_name(last_nameValue : string) {
    this.last_nameValue = last_nameValue;
  };
  changeEmail(emailValue : string) {
    this.emailValue = emailValue
  };

  avatarPreview = [];
  user = {};
  users = [];
  type_user = {};
  type_users = [];
  contribution = {};
  contributions = [];
  isLoading = true;
  isEditing = false;
  isAdding = false;
  isChecked = false;

  // Form validators
  addUserForm : FormGroup;
  first_name = new FormControl('', Validators.required);
  last_name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(6),
    Validators.maxLength(6)
  ]);
  phone = new FormControl('', Validators.required);
  avatar;
  company_address;
  company_name;
  company_job;
  company_business_revenue;
  num_employee;
  other_function;
  contribution_id;
  points;
  type_user_id;
  hobby;
  description;

  constructor(private userService : UserService, private type_userService : Type_userService, private contributionService : ContributionService, private formBuilder : FormBuilder, private http : Http, public toast : ToastComponent) {}

  ngOnInit() {
    this.getUsers();
    this.getTypeUsers();
    this.getContributions();

    // Upload image file for user's avatar
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item : any, response : any, status : any, headers : any) => {
      this.avatarPreview = [];
      console.log("ImageUpload:uploaded:", item, status, response);
      switch (item['file']['type']) {
        case 'image/jpeg':
          this
            .avatarPreview
            .push(item['file']['name']);
          break;
        case 'image/png':
          this
            .avatarPreview
            .push(item['file']['name']);
          break;
        default:
          this
            .toast
            .setMessage('Veuillez choisir un fichier aux formats jpg ou png.', 'danger');
          this.avatarPreview = [];
          break;

      };
      this.avatar = this.urlPublic + this.avatarPreview[0];
    };

    // Declare data form to check
    this.addUserForm = this
      .formBuilder
      .group({
        first_name: this.first_name,
        last_name: this.last_name,
        avatar: this.avatar,
        email: this.email,
        password: this.password,
        phone: this.phone,
        company_name: this.company_name,
        company_job: this.company_job,
        company_address: this.company_address,
        company_business_revenue: this.company_business_revenue,
        num_employee: this.num_employee,
        other_function: this.other_function,
        contribution_id: this.contribution_id,
        points: this.points,
        type_user_id: this.type_user_id,
        hobby: this.hobby,
        description: this.description
      });

  }

  // Control inputs
  setClassEmail() {
    return {
      'has-danger': !this.email.pristine && !this.email.valid
    };
  }

  setClassPassword() {
    return {
      'has-danger': !this.password.pristine && !this.password.valid
    };
  }

  setClassPhone() {
    return {
      'has-danger': !this.phone.pristine && !this.phone.valid
    };
  }

  getUsers() {
    this
      .userService
      .getUsers()
      .subscribe(data => this.users = data, error => console.log(error), () => this.isLoading = false);
  }

  getTypeUsers() {
    this
      .type_userService
      .getTypeUsers()
      .subscribe(data => this.type_users = data, error => console.log(error), () => this.isLoading = false);
  }

  getContributions() {
    this
      .contributionService
      .getContributions()
      .subscribe(data => this.contributions = data, error => console.log(error), () => this.isLoading = false);
  }

  addUser() {
    this
      .userService
      .addUser(this.addUserForm.value)
      .subscribe(res => {
        const newUser = res.json();
        this
          .users
          .push(newUser);
        this
          .addUserForm
          .reset();
        this
          .toast
          .setMessage('Utilisateur ajouté avec succès.', 'success');
        setTimeout(() => {
          this.isAdding = false;
          this.avatarPreview = [];
        }, 1500);
        this.getUsers();
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
    this.avatarPreview = [];
    this
      .toast
      .setMessage('Création annulée.', 'warning'); // reload the users to reset the adding
    this.getUsers();
  }

  enableEditing(user) {
    this.isEditing = true;
    this.user = user;
    // this.isChecked = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.isAdding = false;
    this.user = {};
    this.avatarPreview = [];
    this
      .toast
      .setMessage('Modification annulée.', 'warning'); // reload the users to reset the editing
    this.getUsers();
  }

  editUser(user) {
    this
      .userService
      .editUser(user)
      .subscribe(res => {
        this.isEditing = false;
        this.user = user;
        this
          .toast
          .setMessage('Modification enregistrée.', 'success');
        setTimeout(() => {
          this.avatarPreview = [];
          this.getUsers();
        }, 10);
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de modification.', 'danger');
      });
  }

  enableDeleting(user) {
    this.user = user;
  }

  deleteUser() {
    this
      .userService
      .deleteUser(this.user)
      .subscribe(res => {
        const pos = this
          .users
          .map(elem => elem.id)
          .indexOf(this.user['id']);
        this
          .users
          .splice(pos, 1);
        this
          .toast
          .setMessage('Membre supprimé avec succès.', 'success');
      }, error => {
        console.log(error);
        this
          .toast
          .setMessage('Erreur de suppression.', 'danger');
      });
  }
}