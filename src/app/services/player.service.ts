import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/players';

  constructor(private http: HttpClient) {}

  // Get all players
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl+"/getAll");
  }


  //Get Players by id
  getPlayer(id:number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  // Add a new player
  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  // Update an existing player
  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player);
  }

  // Delete a player
  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
