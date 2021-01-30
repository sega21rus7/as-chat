FROM ubuntu:bionic

ENV DIR=/home/as
ENV NODE_ENV=production

WORKDIR $DIR

RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

ADD ./package.json $DIR/
ADD ./client/package.json $DIR/client/package.json
ADD ./server/package.json $DIR/server/package.json

RUN npm run init

COPY ./client $DIR/client
RUN npm run build_client

COPY ./server $DIR/server

CMD ["npm", "run", "server_prod"]

