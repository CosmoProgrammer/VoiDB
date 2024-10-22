const path = require("path");
const fs = require("fs");

function preRunCheck() {
  let config = require(`${__dirname}/config.json`);
  if (!fs.existsSync(path.join(__dirname, "../", "storage"))) {
    fs.mkdirSync(`./storage`);
    fs.mkdirSync(`./node_modules/voidb/storage`);
  }
  let messageMode = config["messageMode"];
  let usingDatabase = config["usingDatabase"];
  let encryptedTables = config["encryptedTables"];
  return [messageMode, usingDatabase, encryptedTables];
}

module.exports = preRunCheck;
