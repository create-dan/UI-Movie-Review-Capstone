import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-renderer',
  templateUrl: './button-renderer.html',
  styleUrls: ['./button-renderer.css']
})
export class ButtonRendererComponent {
  @Input()
  params: any;

  constructor(private router: Router) { }

  agInit(params: any): void {
    this.params = params;
  

  }

  navigate(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
