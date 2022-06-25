import {TeamRepositoryInterface} from "../../Domain/Repositories/TeamRepositoryInterface";
import {Team} from "../../Domain/Entities/Team";

export class TeamRepository implements TeamRepositoryInterface {
    private model = Team;

    async create(teams: Team[]): Promise<Team[]> {
        await this.model.save(teams);
        return teams;
    }

    async findOneByName(teamName: string): Promise<Team> {
        const teamWithPlayers: Team = await this.model
            .createQueryBuilder('team')
            .innerJoinAndSelect("team.players", "player")
            .where(`team.name = "${teamName}"`)
            .getOne();

        const teamWithoutPlayers: Team = await this.model
            .createQueryBuilder('team')
            .where(`team.name = "${teamName}"`)
            .getOne();

        return teamWithPlayers || teamWithoutPlayers;
    }

}