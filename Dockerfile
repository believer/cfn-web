FROM node:8.5

WORKDIR /app

ADD package.json /app/package.json
RUN npm install -s
RUN npm install -g serve

ADD . /app

RUN npm run build

EXPOSE 4000

CMD serve -s build
