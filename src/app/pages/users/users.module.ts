import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule, PaginationModule } from 'ngx-bootstrap';
import { UserShowComponent } from './user-show/user-show.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [UserCreateComponent, UserShowComponent, UserDetailsComponent]
})
export class UsersModule { }
