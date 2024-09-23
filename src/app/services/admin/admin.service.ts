import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/components/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  addMovie(movie: Movie): Observable<Movie> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Movie>(`${this.apiUrl}/admin/movie`, movie, { headers });
  }

  getTotalReviews(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/reviews/count`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/count`);
  }


}
