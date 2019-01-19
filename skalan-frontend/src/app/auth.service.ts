import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {delay, map} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {

  }

  login(username: string, password: string): Observable<boolean> {
    return this.apiService.login(username, password)
      .pipe(map(user => {
        if (user) {
          const auth = window.btoa(username + ':' + password);
          localStorage.setItem('user', auth);
          return true;
        }
        throwError('Login failed');
      }));
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }
}
