import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from '../models/Movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Review } from '../models/Review';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authenticatin/auth.service';

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
  reviewSuccess: boolean = false; 
  reviewError = false;
  reviewErrorMessage = '';
  showCopiedMessage = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  hoveredRating: number = 0;
  

  ratingControl = new FormControl('', Validators.required);
  commentControl = new FormControl('', [Validators.required, Validators.minLength(1)]);


  constructor(public router: Router, public movieService: MovieService, public activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer,public authService:AuthService) {
    this.movie = new Movie()
  }

  hoverRating(rating: number) {
    this.hoveredRating = rating;
  }

  selectRating(rating: number) {
    this.selectedRating = rating;
    this.ratingControl.setValue(String(rating));
  }

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
           
          });

          this.movieService.getAverageRating(this.movieId).subscribe(averageRating => this.averageRating=averageRating || 0);
          
          
      });
  }



  submitReview(){
    console.log(this.ratingControl.value);
    console.log(this.commentControl.value)

    if (this.ratingControl.invalid || this.commentControl.invalid) {
      this.reviewError = true;
      this.reviewErrorMessage = 'Please fill in all required fields.';
      setTimeout(() => {
        this.reviewError = false;
      }, 3000);
      return;
    }
    
    
    const userId = JSON.parse(localStorage.getItem('userId')!); 
    if (!userId) {
      console.error('User ID not found, please log in.');
      return;
    }
    
    const review = {
      movie: {
        movieId: this.movieId 
      },
      user: {
        userId: userId
      },
      rating: this.ratingControl.value, 
      description: this.commentControl.value 
    };

    this.movieService.addReview(review).subscribe(
      (response) => {
      
        this.reviewSuccess = true; 
        this.loadMovieAndReviews();
      
        this.selectedRating=0;
        this.hoveredRating=0;
        this.ratingControl.setValue('');
        this.commentControl.reset();
        

        setTimeout(() => {
          this.reviewSuccess = false;
         
        }, 5000);
      },
      (error) => {
       
        console.log('Error submitting review:', error);
      }
    );

  }


  copyUrl() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      console.log('URL copied to clipboard:', currentUrl);
      this.showCopiedMessage = true;

  
      setTimeout(() => {
        this.showCopiedMessage = false;
      }, 3000);
    }, (err) => {
      console.error('Error copying URL:', err);
    });
  }

}
