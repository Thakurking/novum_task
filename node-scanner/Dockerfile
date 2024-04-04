FROM node:16-alpine as BUILD

WORKDIR /app/node-scanner

COPY build/index.js /app/node-scanner/build/

CMD ["node", "build/index.js"]
