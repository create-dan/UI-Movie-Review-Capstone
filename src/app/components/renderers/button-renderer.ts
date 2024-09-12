import { Component } from '@angular/core';

@Component({
  selector: 'button-renderer',
  template: `<button class="btn btn-primary w-100" (click)="onClick()">{{ params.value }}</button>`
})
export class ButtonRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onClick() {
    alert(`Viewing details for ${this.params.data.title}`);
  }
}
