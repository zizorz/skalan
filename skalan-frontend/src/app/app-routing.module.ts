import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRatingsComponent } from './list-ratings/list-ratings.component';
import {SkalaComponent} from "./skala/skala.component";

const routes: Routes = [
  { path: '', redirectTo: '/skala', pathMatch: 'full' },
  { path: 'list', component: ListRatingsComponent },
  { path: 'skala', component: SkalaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
