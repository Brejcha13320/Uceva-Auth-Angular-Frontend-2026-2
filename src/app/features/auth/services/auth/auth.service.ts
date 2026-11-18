import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../token/token.service';
import { LoginUser } from '../../interfaces/login.interface';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { RegisterUser } from '../../interfaces/register.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly tokenService = inject(TokenService);

  login(email: string, password: string): Observable<LoginUser> {
    return this.http.post<LoginUser>('/auth/login', { email, password })
      .pipe(
        tap(({ user, token }: LoginUser) => {
          this.tokenService.saveToken(token);
          this.saveUser(user);
        })
      )
  }

  register(registerUser: RegisterUser): Observable<User> {
    return this.http.post<User>('/auth/register', registerUser);
  }

  saveUser(user: User){
    this.storageService.saveItem<User>('user', user);
  }

  getUser(): User | null {
    return this.storageService.getItem('user');
  }

  logout(){
    this.tokenService.removeToken();
    this.storageService.removeItem('user');
    this.router.navigateByUrl('/auth/login');
  }
  
}
