FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node /app/src/index.js
EXPOSE 8081