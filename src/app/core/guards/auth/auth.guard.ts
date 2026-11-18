import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth/auth.service';
import { TokenService } from '../../../features/auth/services/token/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const token = tokenService.getToken();

  //No tiene token si puede estar en auth
  if(!token) return true;

  //Si tiene token toca validarlo
  return tokenService.validateToken().pipe(
    map(({ authorization, error, user }) => {
      //Token Valido no puede estar en el auth se va pal home
      if(authorization && user){
        console.log('[Token Valid] No puede estar en el auth');
        authService.saveUser(user);
        router.navigateByUrl('/dashboard');
        return false;
      } else {
        console.log('[Token Not Valid] Puede estar en el auth');
        authService.logout();
        return true;
      }
    })
  );
};
