FROM node:12.18-alpine

WORKDIR /cabeleleira-leila-web

ENV PATH /cabeleleira-leila-web/node_modules/.bin:$PATH
ENV NODE_ENV=dev

# Install dependencies
COPY package.json /cabeleleira-leila-web/
RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200