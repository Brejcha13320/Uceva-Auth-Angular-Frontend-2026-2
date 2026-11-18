import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../../../features/auth/interfaces/user.interface';
import { AuthService } from '../../../features/auth/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const alertService = inject(AlertService);

  const userRole = authService.getUser()?.rol;
  const allowedRoles = route.data['roles'] as UserRole[];

  // El administrador puede acceder a todos los módulos.
  if (userRole === 'ADMIN') {
    return true;
  }

  if (userRole && allowedRoles?.includes(userRole)) {
    return true;
  }

  alertService.toast('No tienes permiso para ingresar aqui', 'warning');
  return router.createUrlTree(['/dashboard']);
};