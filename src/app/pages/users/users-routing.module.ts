import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserShowComponent } from './user-show/user-show.component';

const routes: Routes = [
  { path: '', redirectTo: 'show', pathMatch: 'full' },
  { path: 'show', component: UserShowComponent  , data : {category : false}},
  { path: 'showuser', component: UserShowComponent  , data : {category : 'user'}},
  { path: 'showseller', component: UserShowComponent  , data : {category : 'seller'}},
  { path: 'showdriver', component: UserShowComponent  , data : {category : 'driver'}},
  { path: 'showworker', component: UserShowComponent  , data : {category : 'worker'}},
  { path: 'details/:id', component: UserDetailsComponent },
  { path: 'create', component: UserCreateComponent , data : {category : false}},
  { path: 'active', component: UserShowComponent, data: { status: 'active',category : false } },
  { path: 'not_active', component: UserShowComponent, data: { status: 'not_active',category : false } },
  { path: 'pending', component: UserShowComponent, data: { status: 'pending',category : false } },
  {
    path: 'driver', children: [
      { path: 'create', component: UserCreateComponent,data : { category: 'driver' } },
      { path: 'show', component: UserShowComponent, data: { category: 'driver' } },
      { path: 'active', component: UserShowComponent, data: { status: 'active' , category : 'driver' } },
      { path: 'not_active', component: UserShowComponent, data: { status: 'not_active' , category : 'driver' } },
      { path: 'pending', component: UserShowComponent, data: { status: 'pending' , category : 'driver' } },
    ]
  },
  {
    path: 'worker', children: [
      { path: 'create', component: UserCreateComponent, data: { category: 'worker' } },
      { path: 'show', component: UserShowComponent, data: { category: 'worker' } },
      { path: 'active', component: UserShowComponent, data: { status: 'active' , category : 'worker' } },
      { path: 'not_active', component: UserShowComponent, data: { status: 'not_active' , category : 'worker' } },
      { path: 'pending', component: UserShowComponent, data: { status: 'pending' , category : 'worker' } },
    ]
  },
  {
    path: 'seller',
    children: [
      { path: 'show', component: UserShowComponent, data: { category: 'seller' } },
      { path: 'create', component: UserCreateComponent, data: { category: 'seller' } },
      { path: 'active', component: UserShowComponent, data: { status: 'active' , category : 'seller' } },
      { path: 'not_active', component: UserShowComponent, data: { status: 'not_active' , category : 'seller' } },
      { path: 'pending', component: UserShowComponent, data: { status: 'pending' , category : 'seller' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
