import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRatingsComponent } from './components/list-ratings/list-ratings.component';
import { SkalaComponent } from './components/skala/skala.component';
import { AuthGuard } from './guards/auth.guard';
import { SubmissionComponent } from './components/submission/submission.component';
import { LoginComponent } from './components/login/login.component';

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
