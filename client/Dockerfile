FROM node:16.15.1-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install  --legacy-peer-deps
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -g npm@8.19.2
CMD ["npm", "run", "start"]