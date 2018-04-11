import { inject,async} from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import {TestBed, ComponentFixture} from '@angular/core/testing';
// Straight Jasmine testing without Angular's testing support
describe('UserService', () => {
  let service: UserDetailComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserDetailComponent] });
  });
  //   it('hii ', inject( [service], ( service ) => {
  //   service.editUser.subscribe(result => expect(result.length).toBeGreaterThan(0)); 
  // }));
  
  // it('#getValue should return real value', () => {
  //   expect(service.getUsers).toBe('real value');
  // });

});
