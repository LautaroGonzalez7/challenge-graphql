import {Arg, Query, Resolver} from "type-graphql";
import {TeamService} from "../../Application/Services/TeamService";
import {Team} from "../../Domain/Entities/Team";
import {ApolloError} from "apollo-server";
import {TeamInput} from "../Inputs/TeamInput";

@Resolver(Team)
export class TeamResolver {
    private playerService: TeamService = new TeamService();

    @Query(() => Team)
    async team(@Arg("teamData") teamData: TeamInput): Promise<Team> {
        try {
            return await this.playerService.getOneByName(teamData.name);
        }catch (error) {
            throw new ApolloError(error.message, error.code);
        }
    }
}