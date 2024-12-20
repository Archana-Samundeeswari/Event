import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { PlayerDashboardComponent } from '../player-dashboard/player-dashboard.component';

@Component({
  selector: 'app-user',
  imports: [NavComponent,RouterOutlet,PlayerDashboardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
