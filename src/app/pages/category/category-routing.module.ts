import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryShowComponent } from './category-show/category-show.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

const routes: Routes = [
  {path : '' , redirectTo : 'show' , pathMatch : 'full'},
  { path : 'show' , component : CategoryShowComponent },
  { path : 'details/:id' , component : CategoryDetailsComponent },
  { path : 'create' , component : CategoryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
