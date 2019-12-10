import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AdminsRoutingModule } from './admins-routing.module';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminShowComponent } from './admin-show/admin-show.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    AdminsRoutingModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [AdminCreateComponent, AdminShowComponent, AdminDetailsComponent]
})
export class AdminsModule { }
