# Graphql challenge

``` CHALLENGE NODE:

Graphql Back-end Developer Hiring Test

The goal is to create a project that exposes an API built with GraphQL, with a mutation and some queries. In case you don’t know GraphQL you can do this test with a rest API, but we appreciate you trying it doing it with GraphQL anyway (researching on how to do it).What should this API do?We’ll be hitting http://www.football-data.org/ API (you can see the documentation in the site, use the API v2) to populate the data locally and then expose it.Import League:There should be a mutation (or endpoint in case you’re working with a rest API) to import a league, named importLeague, that takes a leagueCode as input.The import league implementation must get data using the given {leagueCode}, by making requests to the http://www.football-data.org/ API, and import the data into a DB. Any SQL or NoSQL DB can be used, as long as there are clear instructions on how to run the project locally as well as an explanation for the decision in the README.The data we’re importing is:

Competition (“name”, “code”, “areaName”)

Team (“name”, “tla”, “shortName”, “areaName”, “email”)

Player (“name”, “position”, “dateOfBirth”, “countryOfBirth”, “nationality”)

Feel free to add to this data structure any other field that you might need.Information to retrieve:Additionally, expose the following queries (or endpoints), that should rely exclusively on the data saved inside the DB (it must not access the API football-data.org):

players: takes leagueCode as a parameter and returns the players that belong to all teams participating in the given league. If the given leagueCode is not present in the DB, it should respond with an error message. Add an optional input to the query to filter players also by team name.

team: takes a name and returns the corresponding team. Additionally, if requested in the query, it should resolve the players for that team.

What we expect:

Once you have finished the project, you must upload all the relevant files inside a ZIP compressed file. It must include all the sources, plus the files related to project configuration and/or dependency management.

Please notice that even though this is a paid API, you can get a free token and perform your testing with the competitions from Tier 1 that are free (listed in this link: https://www.football-data.org/assets/FootballData_API_Tiers_and_Competitions_June_2018.pdf)

It’s important that the code handles in some way the limit frequency to the requests performed with a free-token

You are allowed to use any library related to the language in which you are implementing the project.

All the mentioned DB entities must keep their proper relationships (the players with which team they belong to; the teams in which leagues participate).

It might happen that when a given leagueCode is being imported, the league has participant teams that are already imported (because each team might belong to one or more leagues). For these cases, it must add the relationship between the league and the team(s) (and omit the process of the preexistent teams and their players).

Please explain your train of thought and your decision making (for libraries/frameworks used) in the README or another doc inside the project.

Nice to have:

It is a plus that the project automatically generates any necessary schemas when it runs the first time.

Usage of Docker or any other containerization is also a plus.
```

## 💻 Requirements

Tener instalado:
- docker
- docker-compose

## 🚀 Installation

- Renombrar el archivo <b>.env-example</b> a <b>.env</b>

- Ejecutar en la raíz del proyecto el siguiente comando:
```
docker-compose up --build
```

Esto va a crear una imagen para la base de datos y otra para la app en node.

## ☕ Getting started

Una vez corriendo docker-compose, ingresar a:

```
http://localhost:8000
```

Clickeando en <b>Query your server</b> te abre una interfaz para interactuar con GraphQL.

Ó también se puede enviar una request directo a esa url.

## 📝 Project structure

### Architecture

Para este proyecto se utilizó una arquitectura hexagonal dividida en las siguientes capas:
- Application
- Domain
- Infraestructure

**Application**<br>
Esta capa contiene los servicios encargados de interactuar con API's externas y también se encarga
de crear y recuperar recursos de la base de datos a través de repositorios.<br>
Los repositorios se encargan de la comunicación con la base de datos.

**Domain**<br>
Esta capa contiene toda la lógica del dominio, principalmente define el modelo o esquema de cada 
**entidad** tanto para la base de datos (typeorm) como para graphql (type-graphql).<br>
Por otro lado se definen **enums** que en este caso sólamente se utilizó para definir errores.<br>
Y por último define los contratos de los repositorios utilizados en la capa de 
**Aplicación** a través de interfaces.

**Infraestructure**<br>
Por último en esta capa se encuentra la lógica relacionada a la persistencia de datos, en este caso 
typeorm y su configuración de conexión así como también la definición de migraciones.<br>
Y por otro lado se encuentra la lógica que interacciona con las request's, como lo son las **queries** 
ó las **mutations** ubicadas dentro de **Resolvers** e **Inputs**.

### Tests
En la raíz del proyecto se creo una carpeta de **tests** dónde replica la esturctura de carpetas del **src**. Los tests 
se crearon utilizando **mocha**.

### Libraries

- **typescript**: para poder manejar una programación orientada a objetos.
- **typeorm**: para toda la interacción con la base de datos.
- **mysql2**: como driver para la base de datos.
- **graphql** y **type-graphql**: para toda la interacción con graphql.
- **class-validator** y **reflect-metadata**: dependencias de type-graphql.
- **axios**: como cliente HTTP para realizar las peticiones a API's externas.
- **dotenv**: para cargar y manejar variables de entorno.
- **apollo-server**: como servidor graphQL autodocumentado.
- **mocha**, **sinon** y **chai**: para test unitarios.
- **ts-mocha**: para correr los tests.

### Root files
- **env-example**: dónde se definen las variables de entorno.
- **Dockerfile** y **docker-compose**: configuraciones para levantar el proyecto en contenedores.
- **ormconfig**: configuraciones para **typeorm**.
- **tsconfig**: configuraciones para typescript y el proyecto en general.
- **gitignore**: para manejo de versiones, en este caso solamente lo agregué para que 
el IDE me ayude con la diferenciación de carpetas temporales.