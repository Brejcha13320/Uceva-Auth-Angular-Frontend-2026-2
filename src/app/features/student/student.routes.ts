import { Routes } from "@angular/router";
import { CreateTaskPage } from "./pages/create-task/create-task.page";
import { DetailTaskPage } from "./pages/detail-task/detail-task.page";
import { ListTasksPage } from "./pages/list-tasks/list-tasks.page";
import { UpdateTaskPage } from "./pages/update-task/update-task.page";

export const routes: Routes = [
    { 
        path: 'task', 
        children: [
            { path: 'list', component: ListTasksPage },
            { path: 'create', component: CreateTaskPage },
            { path: 'update/:id', component: UpdateTaskPage },
            { path: 'detail/:id', component: DetailTaskPage },
            { path: '**', redirectTo: 'list' },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
        ] 
    },
    { path: '', redirectTo: 'task', pathMatch: 'full' },
    { path: '**', redirectTo: 'task' }
];