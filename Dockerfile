FROM node:10.9.0

RUN mkdir /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
COPY .babelrc /app
RUN yarn install

# Bundle app source
COPY . /app
RUN yarn build:production
EXPOSE 3000
CMD [ "yarn", "prod" ]
