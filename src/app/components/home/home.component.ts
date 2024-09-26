import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images: string[] = [
    '../../../assets/joker.jpg',
    '../../../assets/home3.jpg',
    '../../../assets/home1.jpg',
     '../../../assets/home5.jpg',
     '../../../assets/home6.jpg',
     '../../../assets/home7.jpg',
  ];
  
  currentImageIndex: number = 0;
  backgroundImage!: string;

  ngOnInit() {
    this.backgroundImage = this.images[this.currentImageIndex];
    this.startImageRotation();
  }

  startImageRotation() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.backgroundImage = this.images[this.currentImageIndex];
    }, 2000); // Change image every 5 seconds
  }

  loginSuccess!:boolean;

  constructor(private route: ActivatedRoute) {}



        
}
