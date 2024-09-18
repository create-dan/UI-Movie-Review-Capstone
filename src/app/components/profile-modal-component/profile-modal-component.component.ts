import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-modal-component',
  templateUrl: './profile-modal-component.component.html',
  styleUrls: ['./profile-modal-component.component.css']
})
export class ProfileModalComponentComponent {

      @Input() user:any;
}
