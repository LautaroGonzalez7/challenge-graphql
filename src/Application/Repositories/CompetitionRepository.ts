import {CompetitionRepositoryInterface} from "../../Domain/Repositories/CompetitionRepositoryInterface";
import {Competition} from "../../Domain/Entities/Competition";

export class CompetitionRepository implements CompetitionRepositoryInterface {
    private model = Competition;

    async create(competition: Competition): Promise<Competition> {
        await competition.save();
        return competition;
    }

    async findAllByCode(competitionCode: string): Promise<Competition[]> {
        return await this.model.find({relations: ["teams"], where: {code: competitionCode}});
    }

    async findOneByCode(competitionCode: string): Promise<Competition> {
        return await this.model.findOne({code: competitionCode});
    }
}