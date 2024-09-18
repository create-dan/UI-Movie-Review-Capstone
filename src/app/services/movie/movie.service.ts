import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Movie } from 'src/app/components/models/Movie';
import { MovieListDto } from 'src/app/components/models/MovieListDto';
import { Review } from 'src/app/components/models/Review';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://localhost:8080';
  

  constructor(public http: HttpClient) {


  }

  getMovies(title: string = ''): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:8080/movies');
  }

  getMovieById(movieId:number):Observable<Movie>{
    return this.http.get<Movie>(`${this.baseUrl}/movies/${movieId}`);
  }

  getAverageRating(movieId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/reviews/movie/${movieId}/avg`) ;
  }

  getTotalReviews(movieId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/reviews/movie/totalreviews/${movieId}`);
  }


  getMoviesWithDetails(): Observable<MovieListDto[]> {
    return this.getMovies().pipe(
      switchMap(movies => {
        const movieDetailsObservables = movies.map(movie => {
          return forkJoin({
            averageRating: this.getAverageRating(movie.movieId) ,
            totalReviews: this.getTotalReviews(movie.movieId)
          }).pipe(
            map(result => new MovieListDto(
              movie.movieId,
              movie.title,
              Math.round((result.averageRating || 0) * 10) / 10,
              result.totalReviews,
              movie.posterUrl,
              'View Details'
            ))
          );
        });
        return forkJoin(movieDetailsObservables);
      })
    );
  }


  // getReviewsByMovieId(movieId: number): Observable<Review[]> {
  //   const params = new HttpParams().set('movieId', movieId);
  //   return this.http.get<any[]>(`${this.baseUrl}/reviews/movie`, { params })
  //     .pipe(
  //       map(reviews => reviews.map(review => ({
  //         ...review,
  
  //           userId: review.user.userId,
  //           username: review.user.username,
  //           email: review.user.email,
          
  //       })))
  //     );
  // }


  getReviewsByMovieId(movieId: number): Observable<Review[]> {
    const params = new HttpParams().set('movieId', movieId);
    return this.http.get<Review[]>(`${this.baseUrl}/reviews/movie`,{params})
  }


  addReview(review: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    
    return this.http.post<any>(`${this.baseUrl}/reviews/add`, review, { headers });
  }
  
}
