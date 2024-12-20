import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';
import { Player } from '../models/Player';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:8080/team';

  constructor(private http: HttpClient) {}

  // Create a new team
  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}`, team);
  }

  // Get a team by ID
  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${id}`);
  }

  // Get all teams
  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/getAll`);
  }

  // Update a team by ID
  updateTeam(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/${id}`, team);
  }

  // Delete a team by ID
  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get all players (assuming a `players` endpoint exists)
  getPlayers(): Observable<Player[]> {
    const playersUrl = `${this.baseUrl}/players`; 
    return this.http.get<Player[]>(playersUrl);
  }
}
