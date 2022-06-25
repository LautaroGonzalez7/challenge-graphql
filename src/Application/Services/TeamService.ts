import {Team} from "../../Domain/Entities/Team";
import {TeamRepository} from "../Repositories/TeamRepository";
import {ApiProvider} from "../ServiceProviders/Api/ApiProvider";
import {Competition} from "../../Domain/Entities/Competition";
import {ErrorsEnum} from "../../Domain/Enums/ErrorsEnum";

export class TeamService {
    private teamRepository: TeamRepository = new TeamRepository();
    private api: ApiProvider = new ApiProvider();

    public async create(competition: Competition): Promise<Team[]> {
        try {
            this.api.url = `${process.env.FOOTBALL_API_URL}/competitions/${competition.externalId}/teams`;
            this.api.headers = {
                "Content-Type": "application/json",
                "X-Auth-Token": process.env.FREE_TOKEN,
            };

            const response = await this.api.get();

            const newTeams: Team[] = [];

            response.data.teams.forEach(team => {
                const newTeam: Team = new Team();
                newTeam.create(team.name, team.tla, team.shortName, team.area.name, team.email, team.id);
                newTeam.competitions = [competition];
                newTeams.push(newTeam);
            });

            const dbTeams: Team[] = await Team.find({relations: ["competitions"]});

            const filteredTeams = this.filterTeams(newTeams, dbTeams, competition);

            return await this.teamRepository.create(filteredTeams);
        } catch (error) {
            console.log(error)
            throw {
                message: "An error has occurred",
                code: ErrorsEnum.INTERNAL_ERROR
            }
        }
    }

    public async getOneByName(teamName: string): Promise<Team> {
        try {
            const team: Team = await this.teamRepository.findOneByName(teamName);

            if (!team) throw {
                message: "Team with this teamName doesn't exists in our db",
                code: ErrorsEnum.NOT_FOUND_ERROR
            }

            return team;
        } catch (error) {
            console.log(error);
            if (error.code === ErrorsEnum.NOT_FOUND_ERROR) throw error;
            throw {
                message: "An error has occurred",
                code: ErrorsEnum.INTERNAL_ERROR
            }
        }
    }

    private filterTeams(newTeams: Team[], dbTeams: Team[], competition: Competition): Team[] {
        if (dbTeams.length === 0) return newTeams;

        const filteredTeams: Team[] = [];

        newTeams.forEach(newTeam => {
            let exists = false;

            dbTeams.forEach(dbTeam => {
                if (newTeam.externalId === dbTeam.externalId) {
                    exists = true;
                    dbTeam.competitions.push(competition);
                    filteredTeams.push(dbTeam);
                }
            })

            if (!exists) filteredTeams.push(newTeam);

            exists = false;
        })

        return filteredTeams;
    }
}