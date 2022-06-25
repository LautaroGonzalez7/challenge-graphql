import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Teams1650069325232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "teams",
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
                    name: "tla",
                    type: "varchar(255)",
                    isNullable: true
                },
                {
                    name: "shortName",
                    type: "varchar(255)",
                    isNullable: true
                },
                {
                    name: "areaName",
                    type: "varchar(255)",
                },
                {
                    name: "email",
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
        await queryRunner.dropTable("teams");
    }

}
