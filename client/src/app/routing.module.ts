import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ConsultantsComponent} from './consultants/consultants.component';
import {ProjectsComponent} from './projects/projects.component';
import {SkillsComponent} from './skills/skills.component';

import {LogoutComponent} from './logout/logout.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'consultants',
    component: ConsultantsComponent,
    canActivate: [AuthGuardAdmin]
  }, {
    path: 'skills',
    component: SkillsComponent,
    canActivate: [AuthGuardAdmin]
  }, {
    path: 'projects',
    component: ProjectsComponent,
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