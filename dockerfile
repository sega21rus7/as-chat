FROM ubuntu:bionic

ENV DIR=/home/as

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
COPY ./server $DIR/server

RUN npm run build_client
RUN mv $DIR/client/build $DIR/server/client_build

CMD ["npm", "run", "server_prod"]

