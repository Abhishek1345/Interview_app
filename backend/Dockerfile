FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 5000

CMD ["npm","start"]

