import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryShowComponent } from './category-show/category-show.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, PaginationModule } from 'ngx-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    TranslateModule.forChild(),
    TagInputModule,
    // BrowserAnimationsModule,
    // FormsModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    ColorPickerModule,
    PaginationModule.forRoot()
  ],
  declarations: [CategoryCreateComponent,CategoryShowComponent,CategoryDetailsComponent]
})
export class CategoryModule { }
