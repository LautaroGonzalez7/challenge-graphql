import {ErrorsEnum} from "../../../src/Domain/Enums/ErrorsEnum";

const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const sandbox = require("sinon").createSandbox();

import {TeamService} from '../../../src/Application/Services/TeamService';
import {TeamRepository} from "../../../src/Application/Repositories/TeamRepository";

describe('TeamService tests', () => {
    it('find competition by name that exists, should return team', async () => {
        sandbox.stub(TeamRepository.prototype, "findOneByName").returns(repositoryFindOneByNameStubValue);

        const teamService = new TeamService();
        const teamServiceResult = await teamService.getOneByName("FC Bayern Santex");

        expect(teamServiceResult).to.deep.equal(expectedFindOneByNameStubValue);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('find competition by name that not exists, should return not found error', async () => {
        try {
            sandbox.stub(TeamRepository.prototype, "findOneByName").returns(undefined);

            const teamService = new TeamService();
            const teamServiceResult = await teamService.getOneByName("FC Bayern Santex");

            expect(teamServiceResult).to.deep.equal(expectedFindOneByNameStubValue);
        } catch (error) {
            expect(error).to.deep.equal({
                message: "Team with this teamName doesn't exists in our db",
                code: ErrorsEnum.NOT_FOUND_ERROR
            });
        }
    });
});

const repositoryFindOneByNameStubValue = {
    id: 1234,
    name: "FC Bayern Santex",
    tla: "SX",
    shortName: "FC Bayern Santex",
    areaName: "Argentina",
    email: "graphql@graphql.com"
};

const expectedFindOneByNameStubValue = {
    id: 1234,
    name: "FC Bayern Santex",
    tla: "SX",
    shortName: "FC Bayern Santex",
    areaName: "Argentina",
    email: "graphql@graphql.com"
};