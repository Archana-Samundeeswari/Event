import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/User';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/users'; 

  constructor(private http: HttpClient,private router:Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.baseUrl + '/login', credentials);
  }

  register(user: { firstname:string, lastName:string,  email: string; password: string, role:string }): Observable<any> {
    return this.http.post(this.baseUrl + '/register', user);
  }

  saveToken(response: any): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('email', response.email);
   
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    this.router.navigate(['/'])
    
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
