import {Team} from "../Entities/Team";

export interface TeamRepositoryInterface {
    create(teams: Team[]): Promise<Team[]>;
    findOneByName(teamName: string): Promise<Team>;
}