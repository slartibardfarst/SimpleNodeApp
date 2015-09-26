FROM node:4.1.1

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY app /usr/src/app
COPY version_info /usr/src/version_info
RUN cd app; npm install

EXPOSE 3000
CMD ["node", "app/index.js"]
