import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTask, Task, UpdateTask } from '../../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>('/tasks');
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`/tasks/${id}`);
  }

  create(createTask: CreateTask): Observable<Task>{
    return this.http.post<Task>('/tasks', createTask);
  }

  update(id: string, createTask: UpdateTask): Observable<Task>{
    return this.http.put<Task>(`/tasks/${id}`, createTask);
  }

  delete(id: string): Observable<Task>{
    return this.http.delete<Task>(`/tasks/${id}`);
  }
  
}
