FROM node:18-alpine

RUN npm -g install serve
RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "serve"]