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

  constructor(private fb: FormBuilder,private adminService:AdminService,private movieService:MovieService) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: ['test', Validators.required],
      description: ['test', Validators.required],
      writer: ['test', Validators.required],
      director: ['test', Validators.required],
      genre: ['test', Validators.required],
      posterUrl: ['test', Validators.required],
      movieCast: ['test', Validators.required],
      videoUrl: ['test', Validators.required],
      releaseDate: ['', Validators.required],
      movieLength: ['3', Validators.required]
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
    }
  }


  




}
