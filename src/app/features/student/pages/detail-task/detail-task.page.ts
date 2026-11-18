import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackComponent } from '../../../../shared/components/back/back.component';
import { Task } from '../../interface/task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-detail-task',
  imports: [BackComponent, CommonModule],
  templateUrl: './detail-task.page.html',
})
export class DetailTaskPage {

  task: Task | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private alertService = inject(AlertService);

  ngOnInit(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.getTask(id);
  }

  getTask(id: string){
    this.taskService.getById(id).subscribe({
      next: (task) => {
        this.task = task;
      },
      error: (error: any) => {
        console.error('Error fetching tasks:', error);
        this.alertService.toast('Error al consultar la tarea', 'error');
        this.router.navigateByUrl('/dasboard/student/task/list');
      }
    })
  }

}
