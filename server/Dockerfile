FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production=false

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["sh", "-c", "npm run migrate && npm run seed && npm start"]
