import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { usersListComponent } from './users/users-list/users-list.component';

import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard] },
  { path: 'users', component: usersListComponent,  canActivate: [AuthGuard] },
  // uploads are lazy loaded
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
