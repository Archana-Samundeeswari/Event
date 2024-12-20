import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../models/Player';
import { Position } from '../../../models/position.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-player',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './manage-player.component.html',
  styleUrls: ['./manage-player.component.css'],
})
export class ManagePlayerComponent implements OnInit {
  players: Player[] = [];
  teams: { id: number; teamName: string }[] = [];
  positions = Object.values(Position);

  newPlayer: Player = this.initializeNewPlayer();
  selectedPlayer: Player = this.initializeNewPlayer();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
    this.loadTeams();
  }

  loadPlayers(): void {
    this.playerService.getPlayers().subscribe((data) => {
      this.players = data;
    });
  }

  loadTeams(): void {
    this.teams = [
      { id: 1, teamName: 'CSK' },
      { id: 2, teamName: 'RCB' },
    ];
  }

  addPlayer(): void {
    this.playerService.createPlayer(this.newPlayer).subscribe(() => {
      this.loadPlayers();
      this.resetNewPlayer();
    });
  }

  editPlayer(player: Player): void {
    // Make sure to preserve user and team details
    this.selectedPlayer = {
      ...player,          // Copy the existing player data
      user: { ...player.user },   // Preserve user details
      team: { ...player.team },   // Preserve team details
    };
    console.log('Selected Player:', this.selectedPlayer);
  }

  updatePlayer(): void {
    console.log('Before Update:', this.selectedPlayer);
  
    // Ensure user and team are correctly preserved, only update position and other fields
    const updatedPlayer: Player = {
      id: this.selectedPlayer.id,
      playerName: this.selectedPlayer.playerName,
      age: this.selectedPlayer.age,
      email: this.selectedPlayer.email,
      position: this.selectedPlayer.position,   // Only update position
      user: {
        id: this.selectedPlayer.user.id,
        firstName: '',
        lastName: '',
        gender: '',
        age: 0,
        city: '',
        email: '',
        password: ''
      },  // Keep user info intact
      team: {
        id: this.selectedPlayer.team.id,
        teamName: '',
        coach: '',
        players: [],
        captain: null
      },  // Keep team info intact
    };
  
    console.log('Payload:', updatedPlayer);
  
    // Now update the player with the updatedPlayer object
    this.playerService.updatePlayer(this.selectedPlayer.id!, updatedPlayer).subscribe(() => {
      this.loadPlayers();
    });
  }
  
  

  deletePlayer(id: number): void {
    this.playerService.deletePlayer(id).subscribe(() => {
      this.loadPlayers();
    });
  }

  initializeNewPlayer(): Player {
    return {
      id: 0,
      playerName: '',
      age: 0,
      email: '',
      position: Position.BATSMAN,
      user: {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        age: 0,
        city: '',
        password: '',
      },
      team: {
        id: 0,
        teamName: '',
        coach: '',
        players: [],
        captain: null,
      },
    };
  }

  resetNewPlayer(): void {
    this.newPlayer = this.initializeNewPlayer();
  }
}
