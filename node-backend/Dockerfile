FROM node:16-alpine as BUILD

WORKDIR /usr/src/node-backend

COPY build/index.js /usr/src/node-backend/build/

EXPOSE 5000

CMD ["node", "build/index.js"]
