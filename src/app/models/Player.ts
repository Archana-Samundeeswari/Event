import { Team } from './Team';
import { User } from './User';
import { Position } from './position.enum';

export interface Player {
    id?: number;
    playerName: string;
    age: number;
    email: string;
    position: Position;
    user: User;
    team: Team; 

}
