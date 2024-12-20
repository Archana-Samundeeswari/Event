
import { Match } from './Match';
import { Team } from './Team';

export interface Tournament {

    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    matches: Match[];
    teams: Team[];
}
