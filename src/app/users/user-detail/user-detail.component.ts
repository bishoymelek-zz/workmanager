import { Component, Input, OnInit } from '@angular/core';

import { NoteService } from '../user.service';

import { User } from '../user-model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {

  @Input()
  user: User;
  users: Observable<User[]>;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.users = this.noteService.getSnapshot();
  }

  deleteUser(id: string) {
    console.log("HIIIII", id)
    this.noteService.deleteNote(id);
  }

}
