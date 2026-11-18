import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { ValidateToken } from '../../interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private readonly TOKEN_KEY: string = 'token';
  private readonly storageService = inject(StorageService);
  private readonly http = inject(HttpClient);

  saveToken(token: string){
    this.storageService.saveItem<string>(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.storageService.getItem<string>(this.TOKEN_KEY);
  }

  removeToken(){
    this.storageService.removeItem(this.TOKEN_KEY);
  }
  
  validateToken(): Observable<ValidateToken> {
    const token = this.getToken();
    if(!token || token === ''){
      return of({ authorization: false, error: 'Token is not valid' })
    }

    return this.http.get<ValidateToken>('/auth/validate-token')
      .pipe(catchError((error) => of(error)))
  }
  
}
