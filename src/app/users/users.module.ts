import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { userService } from './user.service';

import { NotesListComponent } from './users-list/users-list.component';
import { NoteDetailComponent } from './user-detail/user-detail.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    NotesListComponent,
    NoteDetailComponent,
  ],
  providers: [userService],
})
export class NotesModule { }
