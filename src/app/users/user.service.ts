import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from './user-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { NotifyService } from '../core/notify.service';

interface NewUser {
  id?: number;
  dateCreated: string,
  firstName: string,
  functionLocation: string,
  lastChanged: string,
  lastName: string,
  password: string,
  plannerGroup: string,
  type: string,
  userName: string,
  workCentre: string,
}

@Injectable()
export class NoteService {

  notesCollection: AngularFirestoreCollection<User>;
  noteDocument: AngularFirestoreDocument<Node>;
  userCollections: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore, public notify: NotifyService) {
    this.notesCollection = this.afs.collection('users', (ref) => ref.orderBy('desc').limit(5));
  }

  getData(): Observable<User[]> {
    return this.notesCollection.valueChanges();
  }

  getSnapshot(): Observable<User[]> {
    // ['added', 'modified', 'removed']
    let userCollections = this.afs.collection<User>('users');
    let items = userCollections.valueChanges();
    return items;
  }

  getNote(id: string) {
    return this.afs.doc<User>(`Users/${id}`);
  }

  create(content:any) {
    if (content.firstName && content.lastName && content.password && content.userName && content.workCenter) {
      const user = {
        id: 4343,
        dateCreated: "20/20",
        firstName: content.firstName,
        functionLocation: '',
        lastChanged: '',
        lastName: content.lastName,
        password: content.password,
        plannerGroup: '',
        type: content.type,
        userName: content.userName,
        workCentre: content.workCenter,
        // time: ,
      };
      this.notify.update('Added Successfully!', 'success');
      return this.notesCollection.add(user);
    } else {
      this.notify.update("please fill all the input fields first", 'error');
      return;
    }
  }

  updateNote(id: string, data: Partial<User>) {
    return this.getNote(id).update(data);
  }

  deleteNote(id: string) {
    return this.getNote(id).delete();
  }
}
