import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule, MatInputModule
} from '@angular/material';
import { ListRatingsComponent } from './list-ratings/list-ratings.component';
import { RatingCardComponent } from './rating-card/rating-card.component';
import { GradeComponent } from './grade/grade.component';
import { SkalaComponent } from './skala/skala.component';
import { HttpClientModule } from '@angular/common/http';
import { SubmissionComponent } from './submission/submission.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    ListRatingsComponent,
    RatingCardComponent,
    GradeComponent,
    SkalaComponent,
    SubmissionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
