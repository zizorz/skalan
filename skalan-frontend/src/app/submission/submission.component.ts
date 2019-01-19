import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { finalize } from 'rxjs/internal/operators';
import { Rating } from '../models/Rating';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  form: FormGroup;

  private failed = false;
  private loading = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      'what': ['', Validators.required],
      'where': ['', Validators.required],
      'motivation': ['', Validators.required],
      'grade': ['5', Validators.required]
    });
  }


  send() {
    this.disable();
    const rating: Rating = this.form.getRawValue();
    rating.imageUrl = 'http://www.fnstatic.co.uk/images/content/recipe/calzone-pizza.jpg';

    this.apiService.sendRating(rating)
      .pipe(finalize(() => this.enable()))
      .subscribe(
        () => this.router.navigate(['list']),
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
