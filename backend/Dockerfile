FROM node:17-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8000

ENV NODE_ENV=production

ENV DATABASE_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>

EXPOSE 8000

CMD ["node", "dist/src/main.js"]