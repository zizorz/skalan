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
  MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule
} from '@angular/material';
import { ListRatingsComponent } from './list-ratings/list-ratings.component';
import { RatingCardComponent } from './rating-card/rating-card.component';
import { GradeComponent } from './grade/grade.component';
import { SkalaComponent } from './skala/skala.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SubmissionComponent } from './submission/submission.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicAuthInterceptor } from './interceptors/AuthInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { ImageSrcPipe } from './image-src.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    ListRatingsComponent,
    RatingCardComponent,
    GradeComponent,
    SkalaComponent,
    SubmissionComponent,
    LoginComponent,
    ImageSrcPipe
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
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthInterceptor,
    multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
