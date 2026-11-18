import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProject, Project, UpdateProject } from '../../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

    private readonly http = inject(HttpClient);

    getAll(): Observable<Project[]> {
      return this.http.get<Project[]>('/projects');
    }

    getById(id: string): Observable<Project> {
      return this.http.get<Project>(`/projects/${id}`);
    }

    create(createProject: CreateProject): Observable<Project>{
      return this.http.post<Project>('/projects', createProject);
    }

    update(id: string, createProject: UpdateProject): Observable<Project>{
      return this.http.put<Project>(`/projects/${id}`, createProject);
    }

    delete(id: string): Observable<Project>{
      return this.http.delete<Project>(`/projects/${id}`);
    }

}
