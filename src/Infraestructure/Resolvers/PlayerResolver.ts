import {Arg, Query, Resolver} from "type-graphql";
import {PlayerService} from "../../Application/Services/PlayerService";
import {Player} from "../../Domain/Entities/Player";
import {ApolloError} from "apollo-server";
import {PlayerInput} from "../Inputs/PlayerInput";

@Resolver(Player)
export class PlayerResolver {
    private playerService: PlayerService = new PlayerService();

    @Query(() => [Player])
    async players(@Arg("playerData") playerData: PlayerInput): Promise<Player[]> {
        try {
            if(playerData.teamName) return await this.playerService.getAllByCompetitionCodeAndTeamName(playerData.competitionCode, playerData.teamName);
            return await this.playerService.getAllByCompetitionCode(playerData.competitionCode);
        }catch (error) {
            throw new ApolloError(error.message, error.code);
        }
    }
}