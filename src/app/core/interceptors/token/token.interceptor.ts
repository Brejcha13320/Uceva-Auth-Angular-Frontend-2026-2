import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../../features/auth/services/auth/auth.service";
import { TokenService } from "../../../features/auth/services/token/token.service";
import { catchError, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const tokenService = inject(TokenService);

    const apiUrl = environment.apiBaseUrl;

    // URLs que no necesitan modificación
    if (req.url.includes('/assets/')) {
        return next(req);
    }

    // Agregamos la URL del backend
    const request = req.clone({
        url: `${apiUrl}/api${req.url}`
    });

    // Endpoints que no necesitan token
    const publicEndpoints = [
        '/auth/login',
        '/auth/register',
        '/auth/forgot-password',
        '/auth/reset-password'
    ];

    const isPublicEndpoint = publicEndpoints.some(endpoint =>
        request.url.includes(endpoint)
    );

    if (isPublicEndpoint) {
        return next(request);
    }

    // Agregamos el token si existe
    const token = tokenService.getToken();

    const authRequest = token
    ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : request;

    return next(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
        if (
            error.status === 401 &&
            error.error?.error === 'Invalid token'
        ) {
            authService.logout();
        }
        return throwError(() => error);
        })
    );
}