FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
ADD dist ./
RUN npm install --only=production

EXPOSE 8080

CMD [ "npm", "run", "start" ]
