import {createConnection} from "typeorm";

export class DatabaseConnection {
    static connect(dirname) {
        const user = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
        const host = process.env.DB_HOST;
        const port = parseInt(process.env.DB_PORT);
        const database = process.env.DB_DATABASE;

        createConnection({
            type: "mysql",
            host: host,
            port: port,
            username: user,
            password: password,
            database: database,
            migrations: ["dist/Infraestructure/Persistence/TypeORM/Migrations/*.js"],
            cli: {
                migrationsDir: "src/Infraestructure/Persistence/TypeORM/Migrations"
            },
            entities: [`${dirname}/Domain/Entities/*.{js,ts}`]
        });
    }
}