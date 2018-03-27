import { Component, OnInit } from '@angular/core';

import { userService } from '../user.service';

import { User } from '../user-model';
import { planner_group } from '../planner-group';

import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { NotifyService } from '../../core/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class usersListComponent implements OnInit {
  users: Observable<User[]>;
  owner: boolean;
  plannerGroups: Observable<planner_group[]>;

  constructor(private userService: userService, public notify: NotifyService, public router: Router) {
    let isLoggedIn = JSON.parse(localStorage.getItem('userData'));
    console.log(isLoggedIn.type);
    if (isLoggedIn.type != 'admin' && isLoggedIn.type != 'owner') {
      if (isLoggedIn.type === 'owner') {
        this.owner = false;
      } else {
        this.owner = true;
      }
      this.notify.update('You must be logged in!', 'error');
      this.router.navigate(['/']);
    }

  }
  ngOnInit() {
    this.plannerGroups = this.userService.getPlannerGroups();
    this.users = this.userService.getSnapshot();
  }

  createUser(data: any) {
    console.log(data.value);
    if (data) {
      let ownerToEdit = ['admin', 'planner', 'standard'];
      let adminToEdit = ['planner', 'standard'];
      let PlannerToEdit = ['standard'];
      let toEditType = data.value.userType;
      console.log("toediiiit", toEditType)
      let userLoggedIn = JSON.parse(localStorage.getItem('userData'));
      let loggedInType = userLoggedIn.type;
      if (loggedInType === 'standard') {
        alert("you don't have permission to do this");;
      } else if (loggedInType === 'planner') {
        if (PlannerToEdit.indexOf(toEditType) !== -1) {
          let answer = this.userService.create(data.value);
        } else {
          alert("you don't have permission to do this");;
        }
      } else if (loggedInType === 'admin') {
        console.log(adminToEdit.indexOf(toEditType));
        console.log(adminToEdit);
        if (adminToEdit.indexOf(toEditType) !== -1) {
          let answer = this.userService.create(data.value);
        } else {
          alert("you don't have permission to do this");;
        }
      } else {
        let answer = this.userService.create(data.value);
      }
    }
    // let answer = this.userService.create(data.value);
  }

}
