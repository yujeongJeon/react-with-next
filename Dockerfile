FROM node:10

RUN mkdir -p /app/webchat

COPY package.json /app/webchat/package.json
RUN cd /app/webchat; npm config set registry http://registry.npmjs.org/; npm config set strict-ssl false; npm install

RUN echo 'node version : ' && node --version
RUN echo 'npm  version : ' &&  npm --version

COPY . /app/webchat

WORKDIR /app/webchat

CMD npm run start

EXPOSE 4001