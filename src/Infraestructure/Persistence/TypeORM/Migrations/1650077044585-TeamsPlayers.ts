import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class TeamsPlayers1650077044585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "teams_players",
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: "teamId",
                    type: "bigint"
                },
                {
                    name: "playerId",
                    type: "bigint"
                }
            ],
        }), true);

        await queryRunner.createForeignKey("teams_players", new TableForeignKey({
            columnNames: ["teamId"],
            referencedColumnNames: ["id"],
            referencedTableName: "teams",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("teams_players", new TableForeignKey({
            columnNames: ["playerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "players",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("teams_players");

        const foreignKeyTeam = table.foreignKeys.find(fk => fk.columnNames.indexOf("teamId") !== -1);
        await queryRunner.dropForeignKey("teams_players", foreignKeyTeam);

        const foreignKeyPlayer = table.foreignKeys.find(fk => fk.columnNames.indexOf("playerId") !== -1);
        await queryRunner.dropForeignKey("teams_players", foreignKeyPlayer);

        await queryRunner.dropTable("teams_players");
    }

}
