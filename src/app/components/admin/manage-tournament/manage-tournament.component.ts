import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../../models/Tournament';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-tournament',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-tournament.component.html',
  styleUrl: './manage-tournament.component.css'
})
export class ManageTournamentComponent implements OnInit {
editTournament(arg0: number|undefined) {
throw new Error('Method not implemented.');
}
addTournament() {
throw new Error('Method not implemented.');
}
updateTournament() {
throw new Error('Method not implemented.');
}
deleteTournament(arg0: any) {
throw new Error('Method not implemented.');
}
  // List of tournaments to display
  tournaments: Tournament[] = [];

  // Tournament being added or edited
  tournament: Tournament = {
    name: '',
    startDate: '',
    endDate: '',
    matches: [],
    teams: []
  };

  // Modal open/close flag
  isModalOpen: boolean = false;
newTournament: any;
selectedTournament: any;

  ngOnInit(): void {
    // Initialize with some default tournaments if needed (or fetch from API)
    this.tournaments = [
      {
        name: '',
        startDate: '',
        endDate: '',
        matches: [],
        teams: []
      },
      {
        name: '',
        startDate: '',
        endDate: '',
        matches: [],
        teams: []
      }
    ];
  }

  // Open modal to add a new tournament
  openAddModal(): void {
    this.isModalOpen = true;
    this.tournament = {
      name: '',
        startDate: '',
        endDate: '',
        matches: [],
        teams: []
    };
  }

  // Open modal to edit an existing tournament
  openEditModal(tournament: Tournament): void {
    this.isModalOpen = true;
    this.tournament = { ...tournament }; // Copy tournament data to be edited
  }

  // Save the tournament (either add new or edit existing)
  saveTournament(): void {
    if (this.tournament.id) {
      // Editing an existing tournament
      const index = this.tournaments.findIndex(t => t.id === this.tournament.id);
      if (index !== -1) {
        this.tournaments[index] = this.tournament; // Update the tournament
      }
    } else {
      // Adding a new tournament
      this.tournament.id = this.tournaments.length + 1; // Generate a new id (adjust as per your logic)
      this.tournaments.push(this.tournament); // Add new tournament to the list
    }
    this.closeModal(); // Close modal after saving
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}