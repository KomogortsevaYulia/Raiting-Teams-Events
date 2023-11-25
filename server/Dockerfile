# FROM ubuntu:20.04
FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
