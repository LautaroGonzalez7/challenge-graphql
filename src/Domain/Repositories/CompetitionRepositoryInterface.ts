import {Competition} from "../Entities/Competition";

export interface CompetitionRepositoryInterface {
    create(competition: Competition): Promise<Competition>;
    findAllByCode(competitionCode: string): Promise<Competition[]>;
    findOneByCode(competitionCode: string): Promise<Competition>;
}