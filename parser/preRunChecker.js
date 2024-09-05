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
  return [messageMode, usingDatabase, encryptedTables];
}

module.exports = preRunCheck;
