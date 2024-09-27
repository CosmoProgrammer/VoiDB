const path = require("path");
const fs = require("fs");

function preRunCheck() {
  let config = require(`${__dirname}/config.json`);
  if (!fs.existsSync(path.join(__dirname, "../", "storage"))) {
    fs.mkdirSync(`./storage`);
  }
  let messageMode = config["messageMode"];
  let usingDatabase = config["usingDatabase"];
  let encryptedTables = config["encryptedTables"];
  let loggedIn = config["login"];
  let users = config["users"];
  return [messageMode, usingDatabase, encryptedTables, loggedIn, users];
}

module.exports = preRunCheck;
