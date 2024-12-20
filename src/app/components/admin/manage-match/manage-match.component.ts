import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/Match';
import { Status } from '../../../models/status.enum';
import { Team } from '../../../models/Team';
import { Tournament } from '../../../models/Tournament';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-match',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './manage-match.component.html',
  styleUrl: './manage-match.component.css'
})
export class ManageMatchComponent implements OnInit {
addMatch() {
throw new Error('Method not implemented.');
}
updateMatch() {
throw new Error('Method not implemented.');
}
  matches: Match[] = [];
  match: Match = {
    name: '',
    status: Status.COMPLETED,
    team1: { name: '', logo: '' } as unknown as Team,
    team2: { name: '', logo: '' } as unknown as Team,
    tournament: { name: '', location: '' } as unknown as Tournament
  };
  isModalOpen: boolean = false;
  isEditing: boolean = false;
newMatch: any;
selectedMatch: any;

  ngOnInit(): void {
    // Initialize with some default matches if needed (or fetch from API)
    this.matches = [
      {
        id: 1,
        name: 'Match 1',
        status: Status.COMPLETED,
        team1: {
          name: 'Team A',
          logo: 'logoA',
          id: 1,
          teamName: 'Team A',
          coach: 'Coach A',
          players: [],
          captain: null
        },
        team2: {
          name: 'Team B',
          logo: 'logoB',
          id: 2,
          teamName: 'Team B',
          coach: 'Coach B',
          players: [],
          captain: null
        },
        tournament: {
          name: 'Tournament 1',
          startDate: '',
          endDate: '',
          matches: [],
          teams: []
        }
      },
      {
        id: 2,
        name: 'Match 2',
        status: Status.COMPLETED,
        team1: {
          name: 'Team C',
          logo: 'logoC',
          id: 3,
          teamName: 'Team C',
          coach: 'Coach C',
          players: [],
          captain: null
        },
        team2: {
          name: 'Team D',
          logo: 'logoD',
          id: 4,
          teamName: 'Team D',
          coach: 'Coach D',
          players: [],
          captain: null
        },
        tournament: {
          name: 'Tournament 2',
          startDate: '',
          endDate: '',
          matches: [],
          teams: []
        }
      }
    ];
  }

  // Open modal to add a new match
  openAddModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.match = {
      name: '',
      status: Status.COMPLETED,
      team1: { name: '', logo: '' } as unknown as Team,
      team2: { name: '', logo: '' } as unknown as Team,
      tournament: { name: '', location: '' } as unknown as Tournament
    };
  }

  // Open modal to edit an existing match
  openEditModal(match: Match): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.match = { ...match }; // Copy match data to be edited
  }

  // Save the match (either add new or edit existing)
  saveMatch(): void {
    if (this.isEditing) {
      // Editing an existing match
      const index = this.matches.findIndex(m => m.id === this.match.id);
      if (index !== -1) {
        this.matches[index] = { ...this.match }; // Update the match
      }
    } else {
      // Adding a new match
      this.match.id = this.matches.length + 1; // Generate a new id (adjust this as per your logic)
      this.matches.push({ ...this.match }); // Add new match to the list
    }
    this.closeModal(); // Close modal after saving
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.match = {
      name: '',
      status: Status.COMPLETED,
      team1: { name: '', logo: '' } as unknown as Team,
      team2: { name: '', logo: '' } as unknown as Team,
      tournament: { name: '', location: '' } as unknown as Tournament
    };
  }

  // Delete a match
  deleteMatch(matchId: number): void {
    const index = this.matches.findIndex(match => match.id === matchId);
    if (index !== -1) {
      this.matches.splice(index, 1); // Remove match from the list
    }
  }
}