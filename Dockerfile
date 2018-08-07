FROM node:10
COPY . /app
WORKDIR /app
RUN npm install -g yarn
RUN yarn install
EXPOSE 3000
CMD yarn deploy