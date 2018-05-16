import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FileSelectDirective} from 'ng2-file-upload';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RoutingModule} from './routing.module';
import {SharedModule} from './shared/shared.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import {UserService} from './services/user.service';
import {Type_userService} from './services/type_user.service';
import {ConsultantService} from './services/consultant.service';
import {ProjectService} from './services/project.service';
import {SkillService} from './services/skill.service';
import {Type_skillService} from './services/type_skill.service';
import {LevelService} from './services/level.service';
import {AuthService} from './services/auth.service';

import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LogoutComponent} from './logout/logout.component';
import {ConsultantsComponent} from './consultants/consultants.component';
import {ProjectsComponent} from './projects/projects.component';
import {SkillsComponent} from './skills/skills.component';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    HomeComponent,
    ConsultantsComponent,
    ProjectsComponent,
    SkillsComponent,    
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
    ConsultantService,
    ProjectService,
    SkillService,
    Type_skillService,
    LevelService,
    Type_userService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {}