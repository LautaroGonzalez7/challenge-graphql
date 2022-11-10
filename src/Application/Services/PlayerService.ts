import {ApiProvider} from "../ServiceProviders/Api/ApiProvider";
import {Player} from "../../Domain/Entities/Player";
import {PlayerRepository} from "../Repositories/PlayerRepository";
import {Team} from "../../Domain/Entities/Team";
import {ErrorsEnum} from "../../Domain/Enums/ErrorsEnum";

export class PlayerService {
    private playerRepository: PlayerRepository = new PlayerRepository();
    private api: ApiProvider = new ApiProvider();

    public async create(teams: Team[]): Promise<void> {
        try {
            const baseUrl: string = `${process.env.FOOTBALL_API_URL}/teams/:teamExternalId`;
            this.api.headers = {
                "Content-Type": "application/json",
                "X-Auth-Token": process.env.FREE_TOKEN,
            };

            for (const team of teams) {
                console.log("waiting for 10 seconds...")
                await new Promise(r => setTimeout(r, 10000));
                console.log("ready!")

                this.api.url = baseUrl.replace(":teamExternalId", `${team.externalId}`)
                const response = await this.api.get();

                const newPlayers: Player[] = [];

                response.data.squad.forEach(player => {
                    const newPlayer: Player = new Player();

                    const dateOfBirth = player.dateOfBirth ? player.dateOfBirth.split("T")[0] : null;

                    newPlayer.create(
                        player.name,
                        player.position,
                        dateOfBirth,
                        player.countryOfBirth,
                        player.nationality,
                        player.id
                    );
                    newPlayer.teams = [team];
                    newPlayers.push(newPlayer);
                });

                const dbPlayers: Player[] = await Player.find({relations: ["teams"]});

                const filteredPlayers = this.filterPlayers(newPlayers, dbPlayers, team);
                await this.playerRepository.create(filteredPlayers);
            }
        } catch (error) {
            console.log(error);
            throw {
                message: "An error has occurred",
                code: ErrorsEnum.INTERNAL_ERROR
            }
        }
    }

    public async getAllByCompetitionCodeAndTeamName(competitionCode: string, teamName: string): Promise<Player[]> {
        try {
            const players: Player[] = await this.playerRepository.findAllByCompetitionCodeAndTeamName(competitionCode, teamName);

            if (players.length === 0) throw {
                message: "Players with this competitionCode or teamName don't exist in our db",
                code: ErrorsEnum.NOT_FOUND_ERROR
            }

            return players;
        } catch (error) {
            console.log(error);
            if (error.code === ErrorsEnum.NOT_FOUND_ERROR) throw error;
            throw {
                message: "An error has occurred",
                code: ErrorsEnum.INTERNAL_ERROR
            }
        }
    }

    public async getAllByCompetitionCode(competitionCode: string): Promise<Player[]> {
        try {
            const players: Player[] = await this.playerRepository.findAllByCompetitionCode(competitionCode);

            if (players.length === 0) throw {
                message: "Players with this competitionCode don't exist in our db",
                code: ErrorsEnum.NOT_FOUND_ERROR
            }

            return players;
        } catch (error) {
            console.log(error);
            if (error.code === ErrorsEnum.NOT_FOUND_ERROR) throw error;
            throw {
                message: "An error has occurred",
                code: ErrorsEnum.INTERNAL_ERROR
            }
        }
    }

    private filterPlayers(newPlayers, dbPlayers, team): Player[] {
        if (dbPlayers.length === 0) return newPlayers;

        const filteredPlayers: Player[] = [];

        newPlayers.forEach(newPlayer => {
            let exists = false;

            dbPlayers.forEach(dbPlayer => {
                if (newPlayer.externalId === dbPlayer.externalId) {
                    exists = true;
                    dbPlayer.teams.push(team);
                    filteredPlayers.push(dbPlayer);
                }
            })

            if (!exists) filteredPlayers.push(newPlayer);

            exists = false;
        })

        return filteredPlayers;
    }
}