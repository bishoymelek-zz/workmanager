import { Component } from '@angular/core';
import { userService } from '../../users/user.service';
import { User } from '../../users/user-model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'readme-page',
  templateUrl: './readme-page.component.html',
  styleUrls: ['./readme-page.component.scss'],
})
export class ReadmePageComponent {
  latest_users: Observable<User[]>;
  user_num: Observable<User[]>;
  constructor(private users_service: userService) { }

  ngOnInit() {
    this.latest_users = this.users_service.getLatestRegisteredUsers();
    this.user_num = this.users_service.getSnapshot();
    this.user_num.subscribe(result => {console.log(result.length)});
    console.log(this.latest_users)
  }
}
