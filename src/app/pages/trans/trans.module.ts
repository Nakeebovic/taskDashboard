import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransRoutingModule } from './trans-routing.module';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';
import { DetailsComponent } from './details/details.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [CreateComponent, ShowComponent, DetailsComponent],
  imports: [
    CommonModule,
    TransRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ]
})
export class TransModule { }
