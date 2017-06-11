let environment = require('./environment').environment;
let serverURLs = require("./credentials").serverURLs;

let config = {
  "DB_URL": {
    "host": `${serverURLs[environment].MONGO_HOST}`,
    "user": `${serverURLs[environment].MONGO_USER}`,
    "password": `${serverURLs[environment].MONGO_PASSWORD}`,
    "database": `${serverURLs[environment].MONGO_DATABASE}`
  },
  "NODE_SERVER_PORT": {
    "port": `${serverURLs[environment].NODE_SERVER_PORT}`
  },
  "NODE_SERVER_URL": {
    "url": `${serverURLs[environment].NODE_SERVER}`
  }
};

module.exports = {
  config: config
};
