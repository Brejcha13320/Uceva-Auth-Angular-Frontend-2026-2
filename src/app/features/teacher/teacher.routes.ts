import { Routes } from "@angular/router";
import { CreateProjectPage } from "./pages/create-project/create-project.page";
import { DetailProjectPage } from "./pages/detail-project/detail-project.page";
import { ListProjectsPage } from "./pages/list-projects/list-projects.page";
import { UpdateProjectPage } from "./pages/update-project/update-project.page";

export const routes: Routes = [
    { 
        path: 'project', 
        children: [
            { path: 'list', component: ListProjectsPage },
            { path: 'create', component: CreateProjectPage },
            { path: 'update/:id', component: UpdateProjectPage },
            { path: 'detail/:id', component: DetailProjectPage },
            { path: '**', redirectTo: 'list' },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
        ] 
    },
    { path: '', redirectTo: 'project', pathMatch: 'full' },
    { path: '**', redirectTo: 'project' }
];