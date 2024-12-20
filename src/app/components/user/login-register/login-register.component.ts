import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-login-register',standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  isActive: boolean = false;
   // For toggling between Sign Up and Sign In
  user: any = {
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    role: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  // Toggle between the forms
  toggleForms(active: boolean): void {
    this.isActive = active;
  }

  // Handle user registration
  register(event: Event): void {
    event.preventDefault();

    if (this.user.role === '') {
      this.errorMessage = 'Please select a role.';
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (response) => {
        alert('Registration successful! Please sign in.');
        this.toggleForms(false); // Switch to Sign In form
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }

  // Handle user login
  login(event: Event): void {
    event.preventDefault();

    const credentials = {
      email: this.user.email,
      password: this.user.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response);
          
          // Redirect to the dashboard based on the user's role
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'PLAYER') {
            this.router.navigate(['/player-dashboard']);
          } else if (response.role === 'SPECTATOR') {
            this.router.navigate(['/spectator-dashboard']);
          }
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
}
