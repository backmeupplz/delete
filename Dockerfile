FROM node:10
COPY . /
RUN npm install -g yarn
RUN yarn install
EXPOSE 3000
ENTRYPOINT yarn deploy