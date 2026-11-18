import { Component, inject } from '@angular/core';
import { Task } from '../../interface/task.interface';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableTasksComponent } from '../../components/table-tasks/table-tasks.component';
import { ButtonConfig } from '../../../../shared/interfaces/button.interface';
import { TableTasksEvents } from '../../interface/table-tasks.interface';

@Component({
  selector: 'app-list-tasks.page',
  imports: [ButtonComponent, TableTasksComponent],
  templateUrl: './list-tasks.page.html',
})
export class ListTasksPage {

  tasks: Task[] = [];

  private router = inject(Router);
  private taskService = inject(TaskService);
  private alertService = inject(AlertService);
  
  createButtonConfig: ButtonConfig = {
    id: 'create-task-button',
    title: 'Create Task',
    type: 'primary',
    outline: true,
    icon: 'plus-circle'
  };

  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    this.taskService.getAll().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error: (error: any) => {
        console.error('Error fetching tasks:', error);
        this.alertService.toast('Error al consultar los estudiantes', 'error');
      }
    });
  }

  createTask(){
    this.router.navigateByUrl('/dashboard/student/task/create');
  }

  tableEvents({ id, action }: TableTasksEvents){
    switch(action){
      case 'detail':
        this.viewDetail(id);
        break;
      case 'edit':
        this.update(id);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  viewDetail(id: string){
    this.router.navigateByUrl(`/dashboard/student/task/detail/${id}`);
  }

  update(id: string){
    this.router.navigateByUrl(`/dashboard/student/task/update/${id}`);
  }

  async delete(id: string){
    const title = '¿Esta seguro?';
    const text = `Se va eliminar la tarea ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if(confirm){
      this.taskService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Eliminación Exitosa', 'success');
          this.getTasks();
        },
        error: () => {
          this.alertService.toast('Error al eliminar la tarea', 'error');
        }
      });
    }

  }

}
