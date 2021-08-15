# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm build

COPY --from=build-stage /app/dist /usr/share/nginx/html
