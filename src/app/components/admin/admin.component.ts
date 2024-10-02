import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/Movie';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  movieForm!: FormGroup;
  totalMovies!:number;
  totalReviews!:number;
  totalUsers!:number;
  showAlert: boolean = false;
  formInvalid:boolean=false;

  constructor(private fb: FormBuilder,private adminService:AdminService,private movieService:MovieService) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: ['Spider-Man: Far From Home', Validators.required],
      description: ["Peter Parker's relaxing summer vacation takes an unexpected turn when Nick Fury shows up in his life. He recruits Peter for a mission to uncover the mystery of several elemental creature attacks across the globe.", Validators.required],
      writer: ['Chris McKenna, Erik Sommers', Validators.required],
      director: ['Jon Watts', Validators.required],
      genre: ['Action, Adventure, Sci-Fi', Validators.required],
      posterUrl: ['https://media.themoviedb.org/t/p/w533_and_h300_bestv2/34jW8LvjRplM8Pv06cBFDpLlenR.jpg', Validators.required],
      movieCast: ['Tom Holland, Samuel L. Jackson, Jake Gyllenhaal, Zendaya, Cobie Smulders', Validators.required],
      videoUrl: ['https://www.youtube.com/embed/Nt9L1jCKGnE', Validators.required],
      releaseDate: ['2019-07-02', Validators.required],
      movieLength: ['2h 9m', Validators.required]
    });

    this.movieService.getMovies().subscribe(
      (movies)=>{
        this.totalMovies=movies.length;
      }
    )


    this.adminService.getTotalReviews().subscribe(
      (total) => {
        this.totalReviews = total;
      },
      (error) => {
        console.error('Error fetching total reviews:', error);
      }
    );

    this.adminService.getTotalUsers().subscribe(
      (total) => {
        this.totalUsers = total;
      },
      (error) => {
        console.error('Error fetching total users:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movie: Movie = this.movieForm.value;
      this.adminService.addMovie(movie).subscribe(
        response => {
          
        this.movieForm.reset();
        this.showAlert = true; 

        setTimeout(() => {
            this.showAlert = false;
        }, 3000);
        },
        error => {
          console.error('Error adding movie', error);
          
        }
      );
    } else {
      console.log('Form is invalid');
      this.formInvalid = true; 

      setTimeout(() => {
          this.formInvalid = false;
      }, 3000);
      }
    
  }


  




}
