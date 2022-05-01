FROM node:16-alpine

WORKDIR /usr/src/next

RUN npm install --global pm2

COPY package*.json ./
COPY package-lock.json ./

RUN npm install --production 

COPY ./ ./  

RUN npm run build

EXPOSE 3000

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]