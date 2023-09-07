FROM node:17-alpine
WORKDIR /app/server/
COPY package*.json /app/server/
RUN npm install
COPY . /app/server/
CMD [ "npm" ,"run","dev"]