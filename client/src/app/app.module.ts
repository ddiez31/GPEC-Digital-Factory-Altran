import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FileSelectDirective} from 'ng2-file-upload';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RoutingModule} from './routing.module';
import {SharedModule} from './shared/shared.module';
import {UserService} from './services/user.service';
import {Type_userService} from './services/type_user.service';
import {ContributionService} from './services/contribution.service';
import {EventService} from './services/event.service';
import {MondayMailService} from './services/monday_mail.service';
import {AuthService} from './services/auth.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {MondayMailComponent} from './monday_mail/monday_mail.component';
import {EventsComponent} from './events/events.component';
import {LogoutComponent} from './logout/logout.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    UsersComponent,
    HomeComponent,
    MondayMailComponent,
    EventsComponent,
    LogoutComponent,
    NotFoundComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    Ng2SearchPipeModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    EventService,
    MondayMailService,
    Type_userService,
    ContributionService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {}