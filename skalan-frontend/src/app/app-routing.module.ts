import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRatingsComponent } from './list-ratings/list-ratings.component';
import { SkalaComponent } from './skala/skala.component';
import { AuthGuard } from './auth.guard';
import { SubmissionComponent } from './submission/submission.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/skala', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'list', component: ListRatingsComponent },
  { path: 'skala', component: SkalaComponent },
  { path: 'submission', component: SubmissionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
