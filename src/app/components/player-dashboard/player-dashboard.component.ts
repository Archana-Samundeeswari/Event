import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './player-dashboard.component.html',
  styleUrl: './player-dashboard.component.css'
})
export class PlayerDashboardComponent {
  // Player data
  player = {
    name: 'MS Dhoni',
    role: 'All-Rounder',
    profileImage: 'dhoni.jpeg',
  };

  // State to control editing
  isEditing = false;

  constructor(private router: Router) {}

  // Logout method
  logout() {
    // Clear authentication tokens or session storage
    localStorage.removeItem('authToken'); // Example: Remove stored token
    sessionStorage.clear(); // Clear session data

    // Redirect to login page or home page
    this.router.navigate(['/login']);
  }

  // Toggles the edit form visibility
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // Saves the profile changes
  saveProfile() {
    alert('Profile updated successfully!');
    this.isEditing = false;
  }
}
