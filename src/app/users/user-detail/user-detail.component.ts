import { Component, Input } from '@angular/core';

import { NoteService } from '../user.service';

import { User } from '../user-model';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class NoteDetailComponent {

  @Input()
  user: User;

  constructor(private noteService: NoteService) { }

  // addHeartToNote(val: number) {
  //   if (this.user.id) {
  //     this.noteService.updateNote(this.user.id, {  });
  //   } else {
  //     console.error('Note missing ID!');
  //   }
  // }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }

}
