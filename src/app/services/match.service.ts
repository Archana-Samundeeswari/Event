
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/Match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private baseUrl = 'http://localhost:8080/match'; 

  constructor(private http: HttpClient) {}

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl);
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/${id}`);
  }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(this.baseUrl, match);
  }

  updateMatch(id: number, match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.baseUrl}/${id}`, match);
  }

  deleteMatch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
