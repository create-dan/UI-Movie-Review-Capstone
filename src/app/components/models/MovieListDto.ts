export class MovieListDto {
    movieId: number;
    movieName: string;
    averageRating: number;
    totalReviews: number;
    image: string;
    viewButton: string;
    genre:string
  
    constructor(movieId: number, movieName: string, averageRating: number, totalReviews: number, image: string, viewButton: string,genre:string) {
      this.movieId = movieId;
      this.movieName = movieName;
      this.averageRating = averageRating;
      this.totalReviews = totalReviews;
      this.image = image;
      this.viewButton = viewButton;
      this.genre=genre
    }
  }
  