FROM node:17-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8000

ENV DATABASE_URI=<database-uri>

EXPOSE 8000

CMD ["node", "dist/main.js"]