import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackComponent } from '../../../../shared/components/back/back.component';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { CreateProject } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-create-project.page',
  imports: [BackComponent, ReactiveFormsModule],
  templateUrl: './create-project.page.html',
})
export class CreateProjectPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private projectService = inject(ProjectService);

  projectForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    asignatura: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    publicado: [false]
  });

  createProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const project: CreateProject = {
      titulo: this.projectForm.value.titulo!,
      descripcion: this.projectForm.value.descripcion!,
      asignatura: this.projectForm.value.asignatura!,
      url: this.projectForm.value.url!,
      publicado: this.projectForm.value.publicado!
    };

    console.log('Proyecto para enviar al backend:', project);

    this.projectService.create(project).subscribe({
      next: () => {
        this.alertService.toast(
          'Proyecto registrado correctamente',
          'success'
        );

        this.router.navigateByUrl('/dashboard/teacher/project/list');
      },
      error: (error: any) => {
        console.error('Error creating project:', error);

        this.alertService.toast(
          'Error al crear el proyecto',
          'error'
        );
      }
    });
  }
}
