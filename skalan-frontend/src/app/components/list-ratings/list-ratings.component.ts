import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Rating } from '../../models/Rating';

@Component({
  selector: 'app-list-ratings',
  templateUrl: './list-ratings.component.html',
  styleUrls: ['./list-ratings.component.scss']
})
export class ListRatingsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  private ratings: Rating[];

  ngOnInit() {
    this.apiService.getRatings().subscribe(ratings => {
      this.ratings = ratings;
    });
  }

}
