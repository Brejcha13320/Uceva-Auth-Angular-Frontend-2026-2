import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { Project, UpdateProject } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';
import { BackComponent } from '../../../../shared/components/back/back.component';

@Component({
  selector: 'app-update-project.page',
  imports: [BackComponent, ReactiveFormsModule],
  templateUrl: './update-project.page.html',
})
export class UpdateProjectPage {

  id!: string;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private projectService = inject(ProjectService);

  projectForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    asignatura: ['', Validators.required],
    url: ['', Validators.required],
    publicado: [false, Validators.required]
  });

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (!paramId || !paramId.trim()) {
      this.alertService.toast('Id no válida', 'error');
      this.goToList();
      return;
    }

    this.id = paramId;
    this.getProject();
  }

  getProject(): void {
    this.projectService.getById(this.id).subscribe({
      next: (project) => {
        this.setValues(project);
      },
      error: (error: any) => {
        console.error('Error fetching project:', error);
        this.alertService.toast('Error al consultar el proyecto', 'error');
        this.goToList();
      }
    });
  }

  setValues(project: Project): void {
    this.projectForm.patchValue({
      titulo: project.titulo,
      descripcion: project.descripcion,
      asignatura: project.asignatura,
      url: project.url,
      publicado: project.publicado
    });
  }

  updateProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const formValue = this.projectForm.getRawValue();

    const project: UpdateProject = {
      titulo: formValue.titulo!,
      descripcion: formValue.descripcion!,
      asignatura: formValue.asignatura!,
      url: formValue.url!,
      publicado: formValue.publicado!
    };

    this.projectService.update(this.id, project).subscribe({
      next: () => {
        this.alertService.toast(
          'Proyecto actualizado correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating project:', error);
        this.alertService.toast(
          'Error al actualizar el proyecto',
          'error'
        );
      }
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/dashboard/teacher/project/list');
  }
}
