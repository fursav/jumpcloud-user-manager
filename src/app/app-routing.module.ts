import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/systemusers', pathMatch: 'full' },
  { path: 'systemusers', component: UserListComponent, data: { animation: 0 } },
  { path: 'systemusers/:id', component: UserDetailComponent, data: { animation: 1 } },
  { path: 'systemusers/add', component: UserDetailComponent, data: { animation: 1 } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
