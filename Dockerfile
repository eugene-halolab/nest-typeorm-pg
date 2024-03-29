FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY ./ /usr/src/app
EXPOSE ${SERVER_PORT}
RUN npm run build
CMD npm start
