FROM node:10

RUN mkdir -p /app/webchat

COPY package.json /app/webchat/package.json
RUN cd /app/webchat; npm config set registry http://registry.npmjs.org/; npm config set strict-ssl false; npm install --unsafe-perm=true

RUN echo 'node version : ' && node --version
RUN echo 'npm  version : ' &&  npm --version

COPY . /app/webchat

WORKDIR /app/webchat

RUN node node_modules/node-sass/scripts/install.js

CMD npm run start:linux

EXPOSE 4001