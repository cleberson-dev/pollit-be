FROM node:16.14

WORKDIR /usr/app

COPY . .
COPY .env.production /usr/app/.env

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]
