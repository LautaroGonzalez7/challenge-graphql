import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CompetitionsTeams1650069411242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "competitions_teams",
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: "competitionId",
                    type: "bigint"
                },
                {
                    name: "teamId",
                    type: "bigint"
                }
            ],
        }), true);

        await queryRunner.createForeignKey("competitions_teams", new TableForeignKey({
            columnNames: ["competitionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "competitions",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("competitions_teams", new TableForeignKey({
            columnNames: ["teamId"],
            referencedColumnNames: ["id"],
            referencedTableName: "teams",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("competitions_teams");

        const foreignKeyCompetition = table.foreignKeys.find(fk => fk.columnNames.indexOf("competitionId") !== -1);
        await queryRunner.dropForeignKey("competitions_teams", foreignKeyCompetition);

        const foreignKeyTeam = table.foreignKeys.find(fk => fk.columnNames.indexOf("teamId") !== -1);
        await queryRunner.dropForeignKey("competitions_teams", foreignKeyTeam);

        await queryRunner.dropTable("competitions_teams");
    }

}
