import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {MondayMailComponent} from './monday_mail/monday_mail.component';
import {EventsComponent} from './events/events.component';
import {LogoutComponent} from './logout/logout.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardAdmin]
  }, {
    path: 'monday_mail',
    component: MondayMailComponent,
    canActivate: [AuthGuardAdmin]
  }, {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuardAdmin]
  }, {
    path: 'logout',
    component: LogoutComponent
  }, {
    path: 'notfound',
    component: NotFoundComponent
  }, {
    path: '**',
    redirectTo: '/notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {}