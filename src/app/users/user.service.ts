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
    let currentUser = JSON.parse(localStorage.getItem('userData'));
    let currentUserRole = currentUser.type;
    if (currentUserRole === 'owner') {
      let userCollections = this.afs.collection<User>('users', (ref) => ref.where("type", "==", 'admin' || 'planner' || 'standard'));
      let items = userCollections.valueChanges();
      return items;
    } else if (currentUserRole === 'admin') {
      let userCollections = this.afs.collection<User>('users', (ref) => ref.where("type", "==",  'planner' || 'standard'));
      let items = userCollections.valueChanges();
      return items;
    }else {
      return ;
    }
  }
  getLatestRegisteredUsers(): Observable<User[]> {
    let userCollections = this.afs.collection<User>('users', (ref) => ref.limit(6).orderBy('dateCreated', 'desc'));
    let items = userCollections.valueChanges();
    return items;
  }
  LoginUser(userName): Observable<User[]> {
    let UserInfo = this.afs.collection<User>('users', (ref) => ref.where("userName", "==", userName));
    let userData = UserInfo.valueChanges();
    return userData;
  }

  getPlannerGroups(): Observable<planner_group[]> {
    let plannerGroups = this.afs.collection<planner_group>('customerInfo');
    let plannerGroupsItems = plannerGroups.valueChanges();
    return plannerGroupsItems;
  }

  getNote(id: string) {
    return this.afs.doc<User>(`users/${id}`);
  }

  create(content: any) {
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