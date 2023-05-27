FROM mcr.microsoft.com/playwright:v1.34.3-jammy

WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH
ENV CI = true

RUN corepack enable
RUN yarn global add npm

COPY package.json /app/
RUN yarn install --production && yarn cache clean

COPY . /app/

ENTRYPOINT yarn run metal:test
