FROM node:16.15.1-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN npm i
CMD ["yarn", "run", "start:dev"]