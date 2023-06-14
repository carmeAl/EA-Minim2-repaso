FROM node:latest
RUN npm install -g ts-node typescript
RUN npm install -g nodemon
RUN npm install -g ts-node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]