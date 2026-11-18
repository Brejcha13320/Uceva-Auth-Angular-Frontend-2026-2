import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonConfig } from '../../../../shared/interfaces/button.interface';
import { TableProjectsActions, TableProjectsEvents } from '../../interfaces/table-projects.interface';
import { Project } from '../../interfaces/project.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-projects',
  imports: [ButtonComponent, DatePipe],
  templateUrl: './table-projects.component.html',
})
export class TableProjectsComponent {
  @Input() projects: Project[] = [];
  @Output() onClickActions = new EventEmitter<TableProjectsEvents>();

  configDetailButton: ButtonConfig = {
    id: 'detail',
    type: 'primary',
    icon: 'eye',
    outline: true,
    size: 'sm'
  }

  configEditButton: ButtonConfig = {
    id: 'update',
    type: 'warning',
    icon: 'pencil-square',
    outline: true,
    size: 'sm'
  }

  configDeleteButton: ButtonConfig = {
    id: 'delete',
    type: 'danger',
    icon: 'trash',
    outline: true,
    size: 'sm'
  }

  click(id: string, action: TableProjectsActions){
    this.onClickActions.emit({id, action});
  }
}
