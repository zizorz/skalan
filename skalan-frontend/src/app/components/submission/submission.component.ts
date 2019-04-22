import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { finalize, map, mergeMap } from 'rxjs/internal/operators';
import { Rating } from '../../models/Rating';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FileInfo } from '../../models/FileInfo';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  form: FormGroup;

  failed = false;
  loading = false;
  file = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      'what': ['', Validators.required],
      'where': ['', Validators.required],
      'motivation': ['', Validators.required],
      'grade': ['5', Validators.required]
    });
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  send() {
    this.disable();
    const rating: Rating = this.form.getRawValue();

    this.apiService.uploadImage(this.file)
      .pipe(map((fileInfo: FileInfo) => rating.imageUrl = fileInfo.filename),
            mergeMap(() => this.apiService.sendRating(rating)),
            finalize(() => this.enable()))
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
