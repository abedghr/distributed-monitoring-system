FROM node:21.1.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN set -x && npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]