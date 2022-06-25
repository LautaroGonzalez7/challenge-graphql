import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Players1650077033432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "players",
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: "name",
                    type: "varchar(255)",
                },
                {
                    name: "position",
                    type: "varchar(255)",
                    isNullable: true
                },
                {
                    name: "dateOfBirth",
                    type: "date",
                    isNullable: true
                },
                {
                    name: "countryOfBirth",
                    type: "varchar(255)",
                    isNullable: true
                },
                {
                    name: "nationality",
                    type: "varchar(255)",
                    isNullable: true
                },
                {
                    name: "externalId",
                    isUnique: true,
                    type: "int",
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("players");
    }

}
