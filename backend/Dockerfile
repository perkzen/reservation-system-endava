FROM node:17-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8000

ENV DATABASE_URI=mongodb+srv://admin:admin@cluster0.g1ftw.mongodb.net/reservation-system

EXPOSE 8000

CMD ["node", "dist/main.js"]