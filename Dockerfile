FROM node:16-alpine

WORKDIR /usr/src/app/novum-monitoring

COPY . .
RUN pwd
RUN ls

RUN npm i
RUN ls

RUN cat package.json
RUN npm i @types/node
RUN npm i @types/morgan
RUN npm i @types/ejs
RUN npm i @types/cors
RUN npm i @types/js-yaml

# RUN cd node-scanner && npx ts-node index.ts
# RUN cd node-backend && npx ts-node index.ts