# Use official Node.js image
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

ENV PORT=3001

CMD ["node", "server.js"]
