import { Component, OnInit } from '@angular/core';

import { NoteService } from '../user.service';

import { User } from '../user-model';

import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class NotesListComponent implements OnInit {

  users: Observable<User[]>;
  // content: string;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.users = this.noteService.getSnapshot();
  }

  createNote(data: NgForm) {
    let answer = this.noteService.create(data.value);
  }

}
