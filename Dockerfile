FROM node:10
VOLUME . /src
WORKDIR /src
RUN npm install -g yarn
EXPOSE 3000
CMD yarn develop