import { Review } from "./Review";

export class Movie {
    movieId: number;
    title: string;
    description: string;
    genre: string;
    director: string;
    movieCast: string;
    writer: string;
    posterUrl: string;
    videoUrl:string;
    releaseDate:string
    movieLength:string
    reviews: Review[];


    constructor(){
        this.movieId=0
        this.title=""
        this.description=""
        this.genre=""
        this.director=""
        this.movieCast=""
        this.writer=""
        this.posterUrl=""
        this.videoUrl=""
        this.releaseDate=""
        this.movieLength=""
        this.reviews=[]
    }
  }