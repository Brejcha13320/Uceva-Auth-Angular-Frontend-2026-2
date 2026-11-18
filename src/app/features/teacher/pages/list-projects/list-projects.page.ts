import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { TableProjectsComponent } from '../../components/table-projects/table-projects.component';
import { Project } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';
import { ButtonConfig } from '../../../../shared/interfaces/button.interface';
import { TableProjectsEvents } from '../../interfaces/table-projects.interface';

@Component({
  selector: 'app-list-projects.page',
  imports: [ButtonComponent, TableProjectsComponent],
  templateUrl: './list-projects.page.html',
})
export class ListProjectsPage {
  projects: Project[] = [];

  private router = inject(Router);
  private taskService = inject(ProjectService);
  private alertService = inject(AlertService);
  
  createButtonConfig: ButtonConfig = {
    id: 'create-task-button',
    title: 'Create Project',
    type: 'primary',
    outline: true,
    icon: 'plus-circle'
  };

  ngOnInit(){
    this.getProjects();
  }

  getProjects(){
    this.taskService.getAll().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
      },
      error: (error: any) => {
        console.error('Error fetching projects:', error);
        this.alertService.toast('Error al consultar los estudiantes', 'error');
      }
    });
  }

  createProject(){
    this.router.navigateByUrl('/dashboard/teacher/project/create');
  }

  tableEvents({ id, action }: TableProjectsEvents){
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
    this.router.navigateByUrl(`/dashboard/teacher/project/detail/${id}`);
  }

  update(id: string){
    this.router.navigateByUrl(`/dashboard/teacher/project/update/${id}`);
  }

  async delete(id: string){
    const title = '¿Esta seguro?';
    const text = `Se va eliminar la tarea ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if(confirm){
      this.taskService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Eliminación Exitosa', 'success');
          this.getProjects();
        },
        error: () => {
          this.alertService.toast('Error al eliminar el proyecto', 'error');
        }
      });
    }

  }
}
