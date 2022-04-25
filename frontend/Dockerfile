# FROM node:16-alpine AS builder

# WORKDIR /usr/src/next

# COPY package*.json ./

# RUN npm install 

# COPY ./ ./  

# RUN npm run build

# CMD [ "npm", "run", "start"]


# ==========================================================
FROM node:16-alpine as dependencies
WORKDIR /usr/src/next
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /usr/src/next
COPY . .
COPY --from=dependencies /usr/src/next/node_modules ./node_modules
RUN npm run build

FROM node:16-alpine as runner
WORKDIR /usr/src/next
ENV NEXT_PUBLIC_APP_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /usr/src/next/public ./public
COPY --from=builder /usr/src/next/.next ./.next
COPY --from=builder /usr/src/next/node_modules ./node_modules
COPY --from=builder /usr/src/next/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]