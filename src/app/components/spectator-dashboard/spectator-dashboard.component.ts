import { Component } from '@angular/core';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spectator-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './spectator-dashboard.component.html',
  styleUrl: './spectator-dashboard.component.css'
})
export class SpectatorDashboardComponent {
  // Flag to toggle between view and edit modes
  isEditing: boolean = false;

  // Example spectator profile with sample data
  spectator: User = {
    firstName: '', lastName: '', gender: '', age: 0, city: '', password: '',
    id: 0,
    email: ''
  };
  constructor(private router: Router) { }

  logout() {
    // Clear authentication tokens or session storage
    localStorage.removeItem('authToken'); // Example: Remove stored token
    sessionStorage.clear(); // Clear session data

    // Redirect to login page or home page
    this.router.navigate(['/login']);
  }

  // Toggle edit mode (view/edit)
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Save the profile data after editing (in a real app, this would save to a backend server)
  saveProfile(): void {
    console.log('Updated Spectator Profile:', this.spectator);
    this.isEditing = false;  // Exit edit mode after saving
  }
}
