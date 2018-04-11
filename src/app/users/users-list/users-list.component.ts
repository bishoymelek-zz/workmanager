import { Component, OnInit } from '@angular/core';
import { userService } from '../user-service/user.service';
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
    let UserData = JSON.parse(localStorage.getItem('userData'));
    if (UserData.type === 'admin' || UserData.type === 'owner') {
      if (UserData.type === 'owner') {
        this.owner = false;
      } else {
        this.owner = true;
      }
    }else{
      this.notify.update('Sorry,You do not have a permission' , 'error');
      this.router.navigate(['/']);

    }
  }
  ngOnInit() {
    this.plannerGroups = this.userService.getPlannerGroups();
  }
  createUser(data: any) {
    this.userService.createUser(data.value);
  }
}