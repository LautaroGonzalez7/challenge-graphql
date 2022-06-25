import {Player} from "../../Domain/Entities/Player";
import {PlayerRepositoryInterface} from "../../Domain/Repositories/PlayerRepositoryInterface";

export class PlayerRepository implements PlayerRepositoryInterface {
    private model = Player;

    async create(players: Player[]): Promise<Player[]> {
        await this.model.save(players);
        return players;
    }

    async findAllByCompetitionCodeAndTeamName(competitionCode: string, teamName: string): Promise<Player[]> {
        return await this.model
            .createQueryBuilder('player')
            .innerJoinAndSelect("player.teams", "team")
            .innerJoinAndSelect("team.competitions", "competition")
            .where(`team.name = "${teamName}"`)
            .andWhere(`competition.code = "${competitionCode}"`)
            .getMany();
    }

    async findAllByCompetitionCode(competitionCode: string): Promise<Player[]> {
        return await this.model
            .createQueryBuilder('player')
            .innerJoinAndSelect("player.teams", "team")
            .innerJoinAndSelect("team.competitions", "competition")
            .where(`competition.code = "${competitionCode}"`)
            .getMany();
    }
}