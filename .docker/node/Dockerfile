FROM node:14.5-alpine

COPY package*.json ./

RUN npm install \
  && apk update \
  && apk add bash \
  && apk add vim

EXPOSE 80