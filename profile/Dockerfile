FROM node:14.15-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod
COPY . .

EXPOSE 8000
CMD [ "npm", "run", "server" ]
