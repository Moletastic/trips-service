FROM node:18.16.0-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run" , "start"]