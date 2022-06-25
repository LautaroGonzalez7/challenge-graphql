import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {DatabaseConnection} from "./Infraestructure/Persistence/TypeORM/DatabaseConnection";
import {CompetitionResolver} from "./Infraestructure/Resolvers/CompetitionResolver";
import {PlayerResolver} from "./Infraestructure/Resolvers/PlayerResolver";
import {TeamResolver} from "./Infraestructure/Resolvers/TeamResolver";

async function main() {
    require('dotenv').config();

    const port = 8000;

    // Log into database
    DatabaseConnection.connect(__dirname);

    const schema = await buildSchema({
        resolvers: [CompetitionResolver, PlayerResolver, TeamResolver],
        emitSchemaFile: __dirname + "/schema/schema.gql"
    });

    const app = new ApolloServer({schema})

    // Start listen mode
    await app.listen(port, () => {
        console.log(`Application started at port ${port}`)
    })
}

main();