import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../models';
import { Subscription } from 'rxjs';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movie-reviews-list',
  templateUrl: './movie-reviews-list.component.html',
  styleUrls: ['./movie-reviews-list.component.css']
})
export class MovieReviewsListComponent implements OnInit, OnDestroy {

  title!: string
  queryParams$!: Subscription
  reviews: Review[] = []

  constructor(private activatedRoute: ActivatedRoute, private movieSvc: MovieService, 
        private router: Router) {}

  ngOnInit() {
    this.queryParams$ = this.activatedRoute.queryParams.subscribe(
      async (queryParams) => {
        this.title = queryParams['query']
        console.log("Getting results for.. " + this.title)
      }
    )
    this.movieSvc.getSearch(this.title)
      .then(p => {
        this.reviews = p
      })
      .catch((err) => console.log(err));
  }

  onBackButton(): void {
    this.router.navigate(['/']);
  }

  onCommentClick(review: Review): void {
    console.log(`Comment on ${review.title}`)
    this.router.navigate(['/comment'], {queryParams: {moviename: review.title}})
  }

  ngOnDestroy(): void {
    this.queryParams$.unsubscribe()
  }
  
  
}

