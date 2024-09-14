export class Review {
  reviewId: number;
  rating: number;
  description: string;
  userId: number;
  username: string;
  userEmail: string;

  constructor(){
    this.reviewId=0
    this.rating=0
    this.description=""
    this.userId=0
    this.username=""
    this.userEmail=""

  }
}