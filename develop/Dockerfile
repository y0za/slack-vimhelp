FROM node:6.2.1
MAINTAINER yoza

WORKDIR /usr/src/app

RUN set -ex \
  && sed -i 's/httpredir/ftp.jp/g' /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y vim

