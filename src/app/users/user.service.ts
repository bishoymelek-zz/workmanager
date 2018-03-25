import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './user-model';
import { planner_group } from './planner-group';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { NotifyService } from '../core/notify.service';
interface NewUser {
  id?: number;
  dateCreated: any,
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
export class userService {

  noteDocument: AngularFirestoreDocument<Node>;
  userCollections: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore, public notify: NotifyService) {
    this.userCollections = this.afs.collection('users', (ref) => ref.orderBy('desc').limit(5));
  }

  // getData(): Observable<User[]> {
  //   return this.userCollections.valueChanges();
  // }

  getSnapshot(): Observable<User[]> {
    // ['added', 'modified', 'removed']
    let userCollections = this.afs.collection<User>('users');
    let items = userCollections.valueChanges();
    return items;
  }
  getLatestRegisteredUsers(): Observable<User[]> {
    // ['added', 'modified', 'removed']
    let userCollections = this.afs.collection<User>('users', (ref) => ref.limit(6));
    let items = userCollections.valueChanges();
    return items;
  }
  getPlannerGroups(): Observable<planner_group[]> {
    // ['added', 'modified', 'removed']
    let plannerGroups = this.afs.collection<planner_group>('customerInfo');
    let plannerGroupsItems = plannerGroups.valueChanges();
    return plannerGroupsItems;
  }

  getNote(id: string) {
    return this.afs.doc<User>(`users/${id}`);
  }

  create(content: any) {
    console.log(content);
    let uid = this.afs.createId();
    if (content.firstName && content.lastName && content.password && content.userName && content.workCenter) {
      const user = {
        id: uid,
        dateCreated: this.formatDate(new Date()),
        firstName: content.firstName,
        functionLocation: '',
        lastChanged: '',
        lastName: content.lastName,
        password: content.password,
        plannerGroup: content.plannerGroup,
        type: content.userType,
        userName: content.userName,
        workCentre: content.workCenter,
        // time: ,
      };
      this.notify.update('Added Successfully!', 'success');
      this.userCollections.doc(uid).set(user).then(data => {
        console.log(data)
      });

      // return this.notesCollection.add(user);
    } else {
      this.notify.update("please fill all the input fields first", 'error');
      return;
    }
  }
  formatDate(date: any) {
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    return day + '/' + monthIndex + '/' + year;
  }

  updateNote(id: string, data: Partial<User>) {
    return this.getNote(id).update(data);
  }

  deleteNote(id: string) {
    return this.getNote(id).delete();
  }
}