import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {finalize} from "rxjs/internal/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  private failed = false;
  private loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  login() {
    this.disable();
    const input = this.form.getRawValue();

    this.authService.login(input.username, input.password)
      .pipe(finalize(() => this.enable()))
      .subscribe(
        result => this.router.navigate(['skala']),
        error => this.failed = true
      );
  }

  private disable() {
    this.loading = true;
    this.form.disable();
  }

  private enable() {
    this.loading = false;
    this.form.enable();
  }



}
