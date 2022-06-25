require('dotenv').config();

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = parseInt(process.env.DB_PORT);
const database = process.env.DB_DATABASE;

module.exports = {
  "type": "mysql",
  "host": host,
  "port": port,
  "username": user,
  "password": password,
  "database": database,
  "synchronize": false,
  "logging": false,
  "migrations": ["dist/Infraestructure/Persistence/TypeORM/Migrations/*.js"],
  "cli": {
    "migrationsDir": "src/Infraestructure/Persistence/TypeORM/Migrations"
  },
  entities: [`/Domain/Entities/*.{js,ts}`]
}