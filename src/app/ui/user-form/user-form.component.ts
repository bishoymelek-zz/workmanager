import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { userService } from '../../users/user-service/user.service';
import { Router } from '@angular/router';

type UserFields = 'email' | 'password';
@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  constructor(private router:Router,private fb: FormBuilder, private auth: AuthService, public userService: userService) { }
  errorMsg: any;
  ngOnInit() {
    this.buildForm();
  }

  login() {
    this.userService.LoginUser(this.userForm.value['userName']).subscribe(userData => {
      if (userData.length != 0) {
        if (this.userForm.value['password'] === userData[0].password) {
          console.log("loggedIn");
          localStorage.setItem('userData', JSON.stringify(userData[0]));
          window.location.reload();

          this.router.navigate(['/']);
        }
        else {
          this.errorMsg = "Wrong Password"
        }
      } else {
        this.errorMsg = "Wrong Credentials,you sure you have an account ?"
      }
    }
    );
  }

  buildForm() {
    this.userForm = this.fb.group({
      'userName': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      ]],
    });

  }
}
