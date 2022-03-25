FROM node:16-alpine
WORKDIR /
COPY . .
RUN npm run build
CMD npm start
