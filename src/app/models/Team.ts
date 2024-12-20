import { Player } from "./Player";
export interface Team {
[x: string]: any;
    id: number; 
    teamName: string; 
    coach: string; 
    players: Player[]; 
    captain: Player | null; 
  }
