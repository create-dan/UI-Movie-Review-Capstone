

export class User{

  userId:number
  username:String
  email:String


  constructor(){
    this.userId=0;
    this.username='';
    this.email='';
  }
}
export class Review {
  reviewId: number;
  rating: number;
  description: string;
  user:User

  constructor(){
    this.reviewId=0
    this.rating=0
    this.description=""
    this.user=new User()

  }
}