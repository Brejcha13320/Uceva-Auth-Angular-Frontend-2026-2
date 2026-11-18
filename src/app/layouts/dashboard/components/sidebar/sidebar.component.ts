import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User, UserRole } from '../../../../features/auth/interfaces/user.interface';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  $userRole = input.required<UserRole>({ alias: 'userRole' });

  $menuItems = signal<MenuItem[]>([]);

  private menuItems: Record<UserRole, MenuItem[]> = {
    ADMIN: [
      {
        label: 'Dashboard',
        icon: 'bi-grid',
        route: '/dashboard'
      },
      {
        label: 'Tareas',
        icon: 'bi-clipboard-check',
        route: '/dashboard/student/task'
      },
      {
        label: 'Proyectos',
        icon: 'bi-card-checklist',
        route: '/dashboard/teacher/project'
      },
    ],
    DOCENTE: [
      {
        label: 'Dashboard',
        icon: 'bi-grid',
        route: '/dashboard'
      },
      {
        label: 'Proyectos',
        icon: 'bi-card-checklist',
        route: '/dashboard/teacher/project'
      },
    ],
    ESTUDIANTE: [
      {
        label: 'Dashboard',
        icon: 'bi-grid',
        route: '/dashboard'
      },
      {
        label: 'Tareas',
        icon: 'bi-clipboard-check',
        route: '/dashboard/student/task'
      },
    ],
  };

  ngOnInit(): void {
    this.$menuItems.set(this.menuItems[this.$userRole() as UserRole] ?? []);
  }

}
