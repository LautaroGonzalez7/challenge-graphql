import {ErrorsEnum} from "../../../src/Domain/Enums/ErrorsEnum";

const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const sandbox = require("sinon").createSandbox();

import {PlayerService} from '../../../src/Application/Services/PlayerService';
import {PlayerRepository} from "../../../src/Application/Repositories/PlayerRepository";

describe('PlayerService tests', () => {
    it('find players by competition code that exists, should return players', async () => {
        sandbox.stub(PlayerRepository.prototype, "findAllByCompetitionCode").returns(repositoryAllByCompetitionCodeStubValue);

        const playerService = new PlayerService();
        const playerServiceResult = await playerService.getAllByCompetitionCode("SX");

        expect(playerServiceResult).to.deep.equal(expectedAllByCompetitionCodeStubValue);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('find players by competition code and team name that exists, should return players', async () => {
        sandbox.stub(PlayerRepository.prototype, "findAllByCompetitionCodeAndTeamName").returns(repositoryAllByCompetitionCodeStubValue);

        const playerService = new PlayerService();
        const playerServiceResult = await playerService.getAllByCompetitionCodeAndTeamName("SX", "FC Santex");

        expect(playerServiceResult).to.deep.equal(expectedAllByCompetitionCodeStubValue);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('find players by competition code that not exists, should return not found error', async () => {
        try {
            sandbox.stub(PlayerRepository.prototype, "findAllByCompetitionCode").returns([]);

            const playerService = new PlayerService();
            const playerServiceResult = await playerService.getAllByCompetitionCode("SX");

            expect(playerServiceResult).to.deep.equal(expectedAllByCompetitionCodeStubValue);
        } catch (error) {
            expect(error).to.deep.equal({
                message: "Players with this competitionCode don't exist in our db",
                code: ErrorsEnum.NOT_FOUND_ERROR
            })
        }
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('find players by competition code and team name that not exists, should return not found error', async () => {
        try {
            sandbox.stub(PlayerRepository.prototype, "findAllByCompetitionCodeAndTeamName").returns([]);

            const playerService = new PlayerService();
            const playerServiceResult = await playerService.getAllByCompetitionCodeAndTeamName("SX", "FC Santex");

            expect(playerServiceResult).to.deep.equal(expectedAllByCompetitionCodeStubValue);
        } catch (error) {
            expect(error).to.deep.equal({
                message: "Players with this competitionCode or teamName don't exist in our db",
                code: ErrorsEnum.NOT_FOUND_ERROR
            })
        }
    });
});

const repositoryAllByCompetitionCodeStubValue = {
    id: 1234,
    name: "Roman",
    position: "Goalkeeper",
    dateOfBirth: "1990-11-14",
    countryOfBirth: "Argentina",
    nationality: "Argentina"
};

const expectedAllByCompetitionCodeStubValue = {
    id: 1234,
    name: "Roman",
    position: "Goalkeeper",
    dateOfBirth: "1990-11-14",
    countryOfBirth: "Argentina",
    nationality: "Argentina"
};