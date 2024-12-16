FROM node:20.9.0-slim

RUN apt update && \
  apt install openssl procps -y && \
  npm install -g @nestjs/cli@10.4.8

USER root

WORKDIR /home/root/app

CMD [ "tail", "-f", "/dev/null" ]