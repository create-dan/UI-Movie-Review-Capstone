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
      title: ['', Validators.required],
      description: ['', Validators.required],
      writer: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      posterUrl: ['', Validators.required],
      movieCast: ['', Validators.required],
      videoUrl: ['', Validators.required],
      releaseDate: ['', Validators.required],
      movieLength: ['', Validators.required]
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
