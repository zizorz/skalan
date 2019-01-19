import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Rating } from './models/Rating';
import { Observable } from 'rxjs';
import {User} from "./models/User";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getRatings(): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(`${this.baseUrl}/ratings`);
  }

  login(username: string, password: string) {
    return this.httpClient.post<User>(`${this.baseUrl}/login`, {username, password});
  }

}
