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
  users: Observable<User[]>;
  public itemDoc: AngularFirestoreDocument<User>;

  constructor(private notifyme: NotifyService, private userService: userService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.users = this.userService.getSnapshot();
    // $( document ).ready(function() {
    $(document).click(function (e) {
      $('td').attr("contenteditable", true);
    });
  }

  deleteUser(id: string) {
    if (confirm("delete this user ?")) {
      this.userService.deleteNote(id);
    }
  }
  makeitEditable(id) {
    console.log(id)
    var listSort = $('tr .' + id);
    console.log(listSort);
    if (listSort.attr('contenteditable')) {
      listSort.removeAttr('contenteditable');
    } else {
      console.log("hiiiii");
      $.each(listSort, function () {
        $(this).prop('contenteditable', true)
      });
      // listSort.attr('contenteditable', true);
    }
    // });
  }
  editUser(id, newValue: any, name): void {
    console.log(id,newValue,name)
    var userRef = this.afs.collection("users").doc(id);
    // Set the "capital" field of the city 'DC'
    userRef.update({
    'firstName' : newValue
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}