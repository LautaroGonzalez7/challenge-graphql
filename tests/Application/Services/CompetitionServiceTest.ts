import {ErrorsEnum} from "../../../src/Domain/Enums/ErrorsEnum";

const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const sandbox = require("sinon").createSandbox();

import {CompetitionService} from '../../../src/Application/Services/CompetitionService';
import {CompetitionRepository} from "../../../src/Application/Repositories/CompetitionRepository";
import {ApiProvider} from "../../../src/Application/ServiceProviders/Api/ApiProvider";

describe('CompetitionService tests', () => {
    it('create competition that not exists, should return competition', async () => {
        sandbox.stub(ApiProvider.prototype, "get").returns(apiStubValue);
        sandbox.stub(CompetitionRepository.prototype, "findOneByCode").returns(undefined);
        sandbox.stub(CompetitionRepository.prototype, "create").returns(repositoryCreateStubValue);

        const competitionService = new CompetitionService();
        const competitionServiceResult = await competitionService.create("SX");

        expect(competitionServiceResult).to.deep.equal(expectedCreateStubValue);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('create competition that exists, should return duplicated error', async () => {
        try {
            sandbox.stub(ApiProvider.prototype, "get").returns(apiStubValue);
            sandbox.stub(CompetitionRepository.prototype, "findOneByCode").returns(repositoryFindStubValue);
            sandbox.stub(CompetitionRepository.prototype, "create").returns(repositoryCreateStubValue);

            const competitionService = new CompetitionService();
            const competitionServiceResult = await competitionService.create("SX");

            expect(competitionServiceResult).to.deep.equal(expectedCreateStubValue);
        } catch (error) {
            expect(error).to.deep.equal({
                message: "Competition is already exists",
                code: ErrorsEnum.DUPLICATED_ERROR
            });
        }
    });
});

const apiStubValue = {
    data: {
        id: 1234,
        name: "Santex soccer",
        area: {
            name: "Argentina"
        }
    }
};

const repositoryFindStubValue = {
    id: 1234,
    code: "SX",
    name: "Santex soccer",
    areaName: "Argentina"
};

const repositoryCreateStubValue = {
    id: 1234,
    code: "SX",
    name: "Santex soccer",
    areaName: "Argentina"
};

const expectedCreateStubValue = {
    id: 1234,
    code: "SX",
    name: "Santex soccer",
    areaName: "Argentina"
};