import { Component } from '@angular/core';
import { userService } from '../../users/user.service';
import { User } from '../../users/user-model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  ngOnInit() {
  }
}
