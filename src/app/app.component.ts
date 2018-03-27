import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { NotifyService } from './core/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn:any;
  constructor(private router:Router,private notify:NotifyService) { 
    this.loggedIn = this.checkLogin();
  }
  
  checkLogin() {
    let isLoggedIn = JSON.parse(localStorage.getItem('userData'));
    console.log("isLoggedIn",isLoggedIn);
    if (!isLoggedIn) {
      console.log('access denied');
      this.notify.update('You must be logged in!', 'error');
      this.router.navigate(['/login']);
      return false
    } else {
      return true
    }
  }
}