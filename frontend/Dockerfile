FROM node:16-alpine
LABEL MAINTAINER="Jeremy Andrews Zantua <jeremyzantua@gmail.com>"
WORKDIR /app/frontend/
COPY package*.json /app/frontend/
RUN npm install
COPY . /app/frontend/
EXPOSE 3000
CMD ["npm", "start"]
