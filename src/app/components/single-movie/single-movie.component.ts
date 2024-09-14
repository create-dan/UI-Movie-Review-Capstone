import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from '../models/Movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Review } from '../models/Review';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent {
  @Input()
  movieId!: number;

  movie!: Movie
  safeVideoUrl!: SafeResourceUrl;
  reviews!:Review[]
  isLoadingReviews = false;
  averageRating:number=0


  constructor(public router: Router, public movieService: MovieService, public activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.movieId = params.get('movieId') ? Number(params.get('movieId')) : 0;

      this.loadMovieAndReviews();
    });
  }

  loadMovieAndReviews() {
   
    this.isLoadingReviews = true;
    

    this.movieService.getMovieById(this.movieId)
      .subscribe(data => {
        this.movie = data;
        this.safeVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.movie.videoUrl);

        this.movieService.getReviewsByMovieId(this.movieId) 
          .subscribe(reviews => {
            this.reviews = reviews;
            this.isLoadingReviews = false; 
            console.log(this.reviews)
          });

          this.movieService.getAverageRating(this.movieId).subscribe(averageRating => this.averageRating=averageRating || 0);
          console.log(this.averageRating);
      });
  }




}
