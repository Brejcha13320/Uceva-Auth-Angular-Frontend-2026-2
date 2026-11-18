import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project.interface';
import { BackComponent } from '../../../../shared/components/back/back.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-detail-project.page',
  imports: [BackComponent, CommonModule],
  templateUrl: './detail-project.page.html',
})
export class DetailProjectPage implements OnInit {

  project: Project | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id || !id.trim()) {
      this.alertService.toast('Id no válida', 'error');
      this.goToList();
      return;
    }

    this.getProject(id);
  }

  getProject(id: string): void {
    this.projectService.getById(id).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: (error: any) => {
        console.error('Error fetching project:', error);
        this.alertService.toast('Error al consultar el proyecto', 'error');
        this.goToList();
      }
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/dashboard/teacher/project/list');
  }

}
