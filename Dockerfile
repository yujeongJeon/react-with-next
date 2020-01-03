FROM node:10

RUN mkdir -p /app/webchat

COPY package.json /app/webchat/package.json
RUN cd /app/webchat; npm install

RUN echo 'node version : ' && node --version
RUN echo 'npm  version : ' &&  npm --version

COPY . /app/webchat

WORKDIR /app/webchat

CMD npm run build
CMD npm run start

EXPOSE 3001