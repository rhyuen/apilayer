FROM mhart/alpine-node:latest
MAINTAINER rhyuen
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
