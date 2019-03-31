FROM keymetrics/pm2:8-alpine

ADD . /code
WORKDIR /code

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

CMD ["/bin/sh", "./docker/.start"]