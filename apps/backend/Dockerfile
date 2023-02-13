FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --network-timeout 600000

COPY . .