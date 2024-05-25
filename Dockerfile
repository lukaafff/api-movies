FROM node:16-alpine

WORKDIR /api

COPY package.json ./

RUN npm install

COPY . .

COPY ./.env.production ./.env

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]