FROM ubuntu:latest
LABEL authors="Reva1v"

FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=.env

#CMD ["node", "app.js"]
CMD npm start

ENTRYPOINT ["top", "-b"]
