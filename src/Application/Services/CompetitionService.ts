import {Competition} from "../../Domain/Entities/Competition";
import {CompetitionRepository} from "../Repositories/CompetitionRepository";
import {ApiProvider} from "../ServiceProviders/Api/ApiProvider";
import {ErrorsEnum} from "../../Domain/Enums/ErrorsEnum";

export class CompetitionService {
    private competitionRepository: CompetitionRepository = new CompetitionRepository();
    private api: ApiProvider = new ApiProvider();

    public async create(competitionCode: string): Promise<Competition> {
        try {
            this.api.url = `${process.env.FOOTBALL_API_URL}/competitions/${competitionCode}`;
            this.api.headers = {
                "Content-Type": "application/json",
                "X-Auth-Token": process.env.FREE_TOKEN,
            };

            const response = await this.api.get();

            const competition: Competition = new Competition();

            const dbCompetition: Competition = await this.competitionRepository.findOneByCode(competitionCode);

            if (dbCompetition) throw {
                message: "Competition is already exists",
                code: ErrorsEnum.DUPLICATED_ERROR
            };

            competition.create(response.data.name, competitionCode, response.data.area.name, response.data.id);

            return await this.competitionRepository.create(competition);
        } catch (error) {
            console.log(error)
            if (error.code === ErrorsEnum.DUPLICATED_ERROR) throw error;
            throw {
                message: "An error has occurred",
                code: ErrorsEnum.INTERNAL_ERROR
            }
        }
    }

    public async getAllByCode(competitionCode: string): Promise<Competition[]> {
        try {
            const competitions: Competition[] = await this.competitionRepository.findAllByCode(competitionCode);

            if (competitions.length === 0) throw {
                message: "Competitions with this competitionCode don't exist in our db",
                code: ErrorsEnum.NOT_FOUND_ERROR
            }

            return competitions;
        } catch (error) {
            console.log(error);
            if (error.code === ErrorsEnum.NOT_FOUND_ERROR) throw error;
            throw {
                message: "An error has occurred",
                code: ErrorsEnum.INTERNAL_ERROR
            }
        }
    }
}