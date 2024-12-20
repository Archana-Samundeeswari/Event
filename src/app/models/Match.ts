
import { Status } from './status.enum';
import { Team } from './Team';
import { Tournament } from './Tournament';

export interface Match {
    id?: number;
    name: string;
    status: Status;
    team1: Team;
    team2: Team;
    tournament: Tournament;
}
