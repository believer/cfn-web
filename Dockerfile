FROM node:8.5

WORKDIR /app

ADD package.json /app/package.json
RUN npm install -s --production
RUN npm install -g serve

ADD . /app

RUN npm run build

CMD serve -s build
