import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Rating } from '../models/Rating';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { FileInfo } from '../models/FileInfo';

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

  sendRating(rating: Rating) {
    return this.httpClient.post(`${this.baseUrl}/ratings`, rating);
  }

  uploadImage(file): Observable<FileInfo> {
    const uploadData = new FormData();
    uploadData.append('image', file, file.name);
    return this.httpClient.post<FileInfo>(`${this.baseUrl}/upload`, uploadData);
  }

}
