import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Sample data for upcoming matches
  upcomingMatches = [
    {
      teamA: 'India',
      teamB: 'Australia',
      date: '2024-12-20',
      time: '4:00 PM',
      venue: 'Chennai Stadium',
    },
    {
      teamA: 'England',
      teamB: 'South Africa',
      date: '2024-12-22',
      time: '7:00 PM',
      venue: 'Delhi Ground',
    },
    {
      teamA: 'Pakistan',
      teamB: 'New Zealand',
      date: '2024-12-24',
      time: '6:00 PM',
      venue: 'Mumbai Arena',
    },
  ];

  // Sample data for live scores
  liveScores = [
    { match: 'India vs Australia', score: '240/5 (50)', status: 'In Progress' },
    { match: 'England vs South Africa', score: '310/8 (50)', status: 'Completed' },
    { match: 'Pakistan vs New Zealand', score: '120/2 (20)', status: 'In Progress' },
  ];

  // Sample data for team players
  teamPlayers = [
    {
      name: 'Virat Kohli',
      role: 'Batsman',
      matches: 254,
      runs: 12285,
      image: 'virat.jpeg',
    },
    {
      name: 'Jasprit Bumrah',
      role: 'Bowler',
      matches: 128,
      runs: 275,
      image: 'bumrah.jpeg',
    },
    {
      name: 'Hardik Pandya',
      role: 'All-Rounder',
      matches: 112,
      runs: 2256,
      image: 'hardik.jpeg',
    },
    {
      name: 'MS Dhoni',
      role: 'Wicketkeeper',
      matches: 350,
      runs: 10773,
      image: 'dhoni.jpeg',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Any additional initialization logic can be placed here
  }
}