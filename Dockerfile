# Stage 1 building the code
FROM node:14.17-alpine3.11 as builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run migrations:run

RUN npm run build

# Stage 2
FROM node:14.17-alpine3.11

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

COPY --from=builder /usr/app/dist/ormconfig.start.js ./ormconfig.js

COPY .env .

EXPOSE 3000

CMD [ "npm", "start"]
