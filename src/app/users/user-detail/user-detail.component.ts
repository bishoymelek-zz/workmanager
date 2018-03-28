import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
declare var jquery: any;
declare var $: any;

import { userService } from '../user.service';
import { Subject } from 'rxjs/Subject';

import { User } from '../user-model';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { NotifyService } from '../../core/notify.service';
export interface Msg {
  content: string;
  style: string;
}

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {

  @Input()
  user: User;
  users: any;
  public itemDoc: AngularFirestoreDocument<User>;

  constructor(private notifyme: NotifyService, private userService: userService, private afs: AngularFirestore) { }

  ngOnInit() {
    // this.users = this.userService.getSnapshot();
  this.users =  this.userService.getUsers;
    // this.users.subscribe(hi=>{
      console.log(this.users);
    // })
  }

  deleteUser(id: string) {
    if (confirm("delete this user ?")) {
      this.userService.deleteUser(id);
    }
  }
  editUser(id, newValue: any, name): void {
    var userRef = this.afs.collection("users").doc(id);
    userRef.update({
      [name]: newValue
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }
}