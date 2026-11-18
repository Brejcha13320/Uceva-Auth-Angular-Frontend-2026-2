import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ButtonConfig } from '../../../../shared/interfaces/button.interface';
import { TableTasksActions, TableTasksEvents } from '../../interface/table-tasks.interface';
import { Task } from '../../interface/task.interface';

@Component({
  selector: 'app-table-tasks',
  imports: [ButtonComponent, DatePipe, CommonModule],
  templateUrl: './table-tasks.component.html',
})
export class TableTasksComponent {
  @Input() tasks: Task[] = [];
  @Output() onClickActions = new EventEmitter<TableTasksEvents>();

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

  click(id: string, action: TableTasksActions){
    this.onClickActions.emit({id, action});
  }
}
