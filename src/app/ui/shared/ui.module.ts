import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../shared/shared.module';

import { NavService } from './nav.service';

import { UserLoginComponent } from '../user-login/user-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { NotificationMessageComponent } from '../notification-message/notification-message.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    UserLoginComponent,
    UserProfileComponent,
    TopNavComponent,
    UserFormComponent,
    HomePageComponent,
    NotificationMessageComponent,
  ],
  exports: [
    TopNavComponent,
    UserProfileComponent,
    NotificationMessageComponent,
  ],
})
export class UiModule { }
