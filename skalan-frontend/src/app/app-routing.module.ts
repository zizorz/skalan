import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRatingsComponent } from './list-ratings/list-ratings.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListRatingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
