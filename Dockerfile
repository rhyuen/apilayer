FROM mhart/alpine-node:latest
MAINTAINER rhyuen
COPY ./package.json ./
RUN npm install && npm cache clean
COPY ./ ./
EXPOSE 8080 5367
RUN addgroup -S api && adduser -S -g api api
RUN chown api -R ./node_modules
USER api
CMD ["npm", "start"]
