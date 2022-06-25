import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Competition} from "../../Domain/Entities/Competition";
import {CompetitionService} from "../../Application/Services/CompetitionService";
import {CompetitionInput} from "../Inputs/CompetitionInput";
import {Team} from "../../Domain/Entities/Team";
import {TeamService} from "../../Application/Services/TeamService";
import {PlayerService} from "../../Application/Services/PlayerService";
import {ApolloError} from "apollo-server";

@Resolver(Competition)
export class CompetitionResolver {
    private competitionService: CompetitionService = new CompetitionService();
    private teamService: TeamService = new TeamService();
    private playerService: PlayerService = new PlayerService();

    @Query(() => [Competition])
    async competitions(@Arg("competitionData") competitionData: CompetitionInput): Promise<Competition[]> {
        try {
            return await this.competitionService.getAllByCode(competitionData.code);
        } catch (error) {
            throw new ApolloError(error.message, error.code);
        }
    }

    @Mutation(() => Competition)
    async createCompetition(@Arg("competitionData") competitionData: CompetitionInput): Promise<Competition> {
        try {
            const competition: Competition = await this.competitionService.create(competitionData.code);
            const teams: Team[] = await this.teamService.create(competition);
            await this.playerService.create(teams);

            return competition;
        } catch (error) {
            throw new ApolloError(error.message, error.code);
        }
    }
}