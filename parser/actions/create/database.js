const fs = require("fs");
const path = require("path");
const classes = require(path.join(__dirname, "../../../", "classes.js"));
const bcrypt = require("bcrypt");

function createDatabase(code, preRunData) {
  let storagePath = path.join(
    __dirname,
    "../../../",
    "storage",
    `${code.details.name}`
  );
  if (fs.existsSync(storagePath)) {
    return new classes.Error(
      "StorageError",
      "A database with that name already exists"
    );
  } else {
    fs.mkdirSync(storagePath);
    const configPath = path.join(__dirname, "../../", `config.json`);
    let config = require(configPath);
    let objj = {};
    objj[code.details.admin] = [bcrypt.hashSync(code.details.password, 10), 1];
    config.users[code.details.name] = objj;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    if (preRunData[0]) return new classes.Success("Database created");
  }
}

module.exports = createDatabase;
