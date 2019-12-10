import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminShowComponent } from './admin-show/admin-show.component';

const routes: Routes = [
  { path: "", redirectTo: 'show', pathMatch: 'full' },
  { path: "show", component: AdminShowComponent },
  { path: "create", component: AdminCreateComponent },
  { path: 'details/:id', component: AdminDetailsComponent },
  { path: 'active', component: AdminShowComponent, data: { status: 'active' } },
  { path: 'not_active', component: AdminShowComponent, data: { status: 'not_active' } },
  { path: 'pending', component: AdminShowComponent, data: { status: 'pending'} },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
