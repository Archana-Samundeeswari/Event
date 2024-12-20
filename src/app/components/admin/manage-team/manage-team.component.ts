import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../models/Team';
import { Player } from '../../../models/Player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css'],
})
export class ManageTeamComponent implements OnInit {
  teams: Team[] = [];
  players: Player[] = [];
  selectedTeam: Team = this.initializeNewTeam();
  newTeam: Team = this.initializeNewTeam();
  modalMode: 'add' | 'edit' = 'add';

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
    this.loadPlayers();
  }

  // Load all teams
  loadTeams(): void {
    this.teamService.getAllTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data; // Success
      },
      error: (error) => {
        console.error('Error loading teams:', error); // Handle error
      },
      complete: () => {
        console.log('Teams loaded successfully.'); // Optional
      },
    });
  }

  // Load all players
  loadPlayers(): void {
    this.teamService.getPlayers().subscribe({
      next: (data: Player[]) => {
        this.players = data; // Success
      },
      error: (error) => {
        console.error('Error loading players:', error); // Handle error
      },
    });
  }

  // Add a new team
  addTeam(): void {
    this.teamService.createTeam(this.newTeam).subscribe({
      next: (team: Team) => {
        this.teams.push(team); // Add to the teams array
        this.resetNewTeamForm(); // Reset form
        this.closeModal(); // Close the modal
      },
      error: (error) => {
        console.error('Error adding team:', error); // Handle error
      },
    });
  }

  // Edit team (fetch team details for editing)
  editTeam(id: number): void {
    this.teamService.getTeam(id).subscribe({
      next: (team: Team) => {
        this.selectedTeam = { ...team }; // Clone the team object for editing
        this.modalMode = 'edit'; // Set modal mode to edit
        this.openModal();
      },
      error: (error) => {
        console.error('Error fetching team for edit:', error); // Handle error
      },
    });
  }

  // Update a team
  updateTeam(): void {
    if (this.selectedTeam.id) {
      this.teamService.updateTeam(this.selectedTeam.id, this.selectedTeam).subscribe({
        next: (updatedTeam: Team) => {
          const index = this.teams.findIndex((t) => t.id === updatedTeam.id);
          if (index !== -1) {
            this.teams[index] = updatedTeam; // Update the team in the list
          }
          this.closeModal(); // Close the modal
        },
        error: (error) => {
          console.error('Error updating team:', error); // Handle error
        },
      });
    }
  }

  // Delete a team
  deleteTeam(id: number): void {
    this.teamService.deleteTeam(id).subscribe({
      next: () => {
        this.teams = this.teams.filter((team) => team.id !== id); // Remove from the list
      },
      error: (error) => {
        console.error('Error deleting team:', error); // Handle error
      },
    });
  }

  // Initialize a new team object
  initializeNewTeam(): Team {
    return {
      id: 0,
      teamName: '',
      coach: '',
      players: [],
      captain: null,
    };
  }

  // Reset the new team form and selected team
  resetNewTeamForm(): void {
    this.newTeam = this.initializeNewTeam();
    this.selectedTeam = this.initializeNewTeam();
    this.modalMode = 'add';
  }

  // Open modal
  openModal(): void {
    const modal = document.getElementById('teamModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Close modal
  closeModal(): void {
    const modal = document.getElementById('teamModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.resetNewTeamForm();
  }
}
