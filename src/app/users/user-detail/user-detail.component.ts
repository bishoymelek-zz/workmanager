import { Component, Input, OnInit } from '@angular/core';

import { userService } from '../user.service';

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

  constructor(private noteService: userService) { }

  ngOnInit() {
    this.users = this.noteService.getSnapshot();
  }

  deleteUser(id: string) {
    if (confirm("delete this user ?")) {
      this.noteService.deleteNote(id);
    }
  }
  editUser(id: string) {

  }

}
