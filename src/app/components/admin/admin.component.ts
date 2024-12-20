import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isLoggedIn=true;
  username : any

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.username = localStorage.getItem('email');
  }

  logout()
  {
    this.authService.logout();
  }
}
