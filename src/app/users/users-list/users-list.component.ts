import { Component, OnInit } from '@angular/core';

import { userService } from '../user.service';

import { User } from '../user-model';
import { planner_group } from '../planner-group';

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
  plannerGroups: Observable<planner_group[]>;

  constructor(private noteService: userService) {}
  ngOnInit() {
    this.plannerGroups = this.noteService.getPlannerGroups();
    this.users = this.noteService.getSnapshot();
  }

  createNote(data: NgForm) {
    let answer = this.noteService.create(data.value);
    console.log(answer)
  }

}
