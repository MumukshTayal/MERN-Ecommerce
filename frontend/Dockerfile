FROM node:17-alpine
WORKDIR /app/client/
COPY package*.json /app/client/
RUN npm install
COPY . /app/client/
CMD [ "npm","run","start" ]
