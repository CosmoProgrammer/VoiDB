const fs = require("fs");
const path = require("path");
const classes = require(path.join(__dirname, "../../../", "classes.js"));
const bcrypt = require("bcrypt");
const { Success } = require("../../../classes");

function authorize(code, preRunData) {
  const configPath = path.join(__dirname, "../../", `config.json`);
  let config = require(configPath);
  let objj = {};
  config.users[preRunData[1]][code.details.username] = [
    bcrypt.hashSync(code.details.password, 10),
    code.details.auth,
  ];
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = authorize;
