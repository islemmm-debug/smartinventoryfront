import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Méthodes génériques avec typage
  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, { 
      headers: this.getHeaders() 
    });
  }

  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`, { 
      headers: this.getHeaders() 
    });
  }

  create<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, { 
      headers: this.getHeaders() 
    });
  }

  update<T>(endpoint: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data, { 
      headers: this.getHeaders() 
    });
  }

  delete<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}/${id}`, { 
      headers: this.getHeaders() 
    });
  }

  // Méthodes simples (alternatives)
  get<T>(path: string): Observable<T> { 
    return this.http.get<T>(`${this.apiUrl}${path}`); 
  }

  post<T>(path: string, body: any): Observable<T> { 
    return this.http.post<T>(`${this.apiUrl}${path}`, body); 
  }

  put<T>(path: string, body: any): Observable<T> { 
    return this.http.put<T>(`${this.apiUrl}${path}`, body); 
  }

}