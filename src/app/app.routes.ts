import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { dashboardGuard } from './core/guards/dashboard/dashboard.guard';
import { roleGuard } from './core/guards/role/role.guard';
import { UserRole } from './features/auth/interfaces/user.interface';

export const routes: Routes = [
    { 
        path: 'auth', 
        canActivate: [authGuard],
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes) 
    },
    { 
        path: 'dashboard', 
        canActivate: [dashboardGuard],
        loadComponent: () => import('./layouts/dashboard/components/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
        children: [
             {
                path: '',
                loadComponent: () =>
                    import('./features/dashboard/pages/dashboard-home/dashboard-home.component')
                        .then(m => m.DashboardHomeComponent)
            },
            {
                path: 'student',
                //canActivate: [roleGuard],
                //data: { roles: ['ESTUDIANTE'] as UserRole[] },
                loadChildren: () =>
                    import('./features/student/student.routes').then(m => m.routes)
            },
            {
                path: 'teacher',
                //canActivate: [roleGuard],
                //data: { roles: ['DOCENTE'] as UserRole[] },
                loadChildren: () =>
                    import('./features/teacher/teacher.routes').then(m => m.routes)
            },
        ]    
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' }
];
