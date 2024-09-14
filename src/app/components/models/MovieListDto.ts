export class MovieListDto {
    movieId: number;
    movieName: string;
    averageRating: number;
    totalReviews: number;
    image: string;
    viewButton: string;
  
    constructor(movieId: number, movieName: string, averageRating: number, totalReviews: number, image: string, viewButton: string) {
      this.movieId = movieId;
      this.movieName = movieName;
      this.averageRating = averageRating;
      this.totalReviews = totalReviews;
      this.image = image;
      this.viewButton = viewButton;
    }
  }
  