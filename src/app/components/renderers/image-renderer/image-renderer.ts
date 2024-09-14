import { Component } from '@angular/core';

@Component({
  selector: 'image-renderer',
  template: `<img [src]="params.value" alt="Movie Poster" style="height: 60px; width: auto;">`
})
export class ImageRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
