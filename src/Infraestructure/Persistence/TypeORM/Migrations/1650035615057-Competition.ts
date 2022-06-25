import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Competition1650035615057 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "competitions",
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
                    name: "code",
                    isUnique: true,
                    type: "varchar(255)",
                },
                {
                    name: "areaName",
                    type: "varchar(255)",
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
        await queryRunner.dropTable("competitions");
    }

}
