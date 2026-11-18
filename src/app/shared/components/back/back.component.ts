import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ButtonConfig } from '../../interfaces/button.interface';

@Component({
  selector: 'app-back',
  imports: [ButtonComponent],
  template: `
    <div class="d-flex justify-content-end">
      <app-button [config]="configBackButton" (onClick)="goBack()" />
    </div>
  `,
})
export class BackComponent {

  location = inject(Location);

  configBackButton: ButtonConfig = {
    id: 'back-button',
    title: 'Back',
    type: 'secondary',
    icon: 'arrow-left',
  }

  goBack() {
    this.location.back();
  }

}