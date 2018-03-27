import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {

  // show = true;
  constructor(public auth: AppComponent) { }

  logout() {
    localStorage.clear();
    window.location.reload();

  }

}
