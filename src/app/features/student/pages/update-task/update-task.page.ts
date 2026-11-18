
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackComponent } from '../../../../shared/components/back/back.component';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { StateTask, Task, UpdateTask } from '../../interface/task.interface';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-update-task',
  imports: [
    BackComponent,
    ReactiveFormsModule
  ],
  templateUrl: './update-task.page.html',
})
export class UpdateTaskPage implements OnInit {

  id!: string;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private taskService = inject(TaskService);

  taskForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    prioridad: ['', Validators.required],
    estado: ['', Validators.required]
  });

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (!paramId || !paramId.trim()) {
      this.alertService.toast('Id no válida', 'error');
      this.goToList();
      return;
    }

    this.id = paramId;
    this.getTask();
  }

  getTask(): void {
    this.taskService.getById(this.id).subscribe({
      next: (task) => {
        this.setValues(task);
      },
      error: (error: any) => {
        console.error('Error fetching task:', error);
        this.alertService.toast('Error al consultar la tarea', 'error');
        this.goToList();
      }
    });
  }

  setValues(task: Task): void {
    this.taskForm.patchValue({
      titulo: task.titulo,
      descripcion: task.descripcion,
      prioridad: task.prioridad,
      estado: task.estado
    });
  }

  updateTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.getRawValue();

    const task: UpdateTask = {
      titulo: formValue.titulo!,
      descripcion: formValue.descripcion!,
      prioridad: formValue.prioridad!,
      estado: formValue.estado as StateTask
    };

    this.taskService.update(this.id, task).subscribe({
      next: () => {
        this.alertService.toast(
          'Tarea actualizada correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating task:', error);
        this.alertService.toast(
          'Error al actualizar la tarea',
          'error'
        );
      }
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/dashboard/student/task/list');
  }
}
