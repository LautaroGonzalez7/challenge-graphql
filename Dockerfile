FROM node:14
ARG DB_HOST
WORKDIR /app-graphql
COPY package.json .
RUN npm install
COPY . .
CMD npm run build && npx typeorm migration:run && npm run test && npm start