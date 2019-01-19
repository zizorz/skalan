import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/internal/operators';
import {Observable} from "rxjs/index";

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
        } else {
          return false;
        }
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
