import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth/auth.service';
import { TokenService } from '../../../features/auth/services/token/token.service';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const token = tokenService.getToken();

  //No tiene token no puede estar en el dashboard
  if(!token){
    router.navigateByUrl('/auth/login');
  }

  //Si tiene token toca validarlo
  return tokenService.validateToken().pipe(
    map(({ authorization, error, user }) => {
      //Token Valido puedes aqui dentro del home
        if(authorization && user){
          console.log('[Token Valid] Puede estar aqui');
          authService.saveUser(user);
          return true;
        } else {
          console.log('[Token Not Valid] No Puede estar aqui');
          authService.logout();
          return false;
        }
    })
  );
};
