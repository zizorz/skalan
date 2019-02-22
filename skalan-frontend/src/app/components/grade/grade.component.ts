import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  @Input() grade: number;

  constructor() { }

  ngOnInit() {
  }

}
