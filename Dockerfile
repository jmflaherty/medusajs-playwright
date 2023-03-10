FROM mcr.microsoft.com/playwright:focal

WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH
ENV CI = true

RUN yarn global add npm

COPY package.json /app/
RUN yarn install

COPY . /app/

ENTRYPOINT yarn run metal:test
