import {Player} from "../Entities/Player";

export interface PlayerRepositoryInterface {
    create(players: Player[]): Promise<Player[]>;
    findAllByCompetitionCodeAndTeamName(competitionCode: string, teamName: string): Promise<Player[]>;
    findAllByCompetitionCode(competitionCode: string): Promise<Player[]>;
}