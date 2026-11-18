import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackComponent } from '../../../../shared/components/back/back.component';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { CreateTask, StateTask } from '../../interface/task.interface';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-create-task.page',
  imports: [BackComponent, ReactiveFormsModule],
  templateUrl: './create-task.page.html',
})
export class CreateTaskPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private taskService = inject(TaskService);

  taskForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    prioridad: ['', Validators.required],
    estado: ['PENDIENTE', Validators.required]
  });

  createTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task: CreateTask = {
      titulo: this.taskForm.value.titulo!,
      descripcion: this.taskForm.value.descripcion!,
      prioridad: this.taskForm.value.prioridad!,
      estado: this.taskForm.value.estado as StateTask
    };

    console.log('Tarea para enviar al backend:', task);

    this.taskService.create(task).subscribe({
      next: () => {
        this.alertService.toast(
          'Tarea registrada correctamente',
          'success'
        );

        this.router.navigateByUrl('/dashboard/student/task/list');
      },
      error: (error: any) => {
        console.error('Error creating task:', error);

        this.alertService.toast(
          'Error al crear la tarea',
          'error'
        );
      }
    });
  }
}
