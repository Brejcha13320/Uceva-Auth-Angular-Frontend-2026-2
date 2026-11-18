import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonConfig } from '../../interfaces/button.interface';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) config!: ButtonConfig;
  @Output() onClick = new EventEmitter<string>();

  click(){
    this.onClick.emit(this.config.id);
  }
}