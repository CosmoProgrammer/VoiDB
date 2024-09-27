const fs = require("fs");
const path = require("path");
const classes = require(path.join(__dirname, "../../../", "classes.js"));
const bcrypt = require("bcrypt");
const { Success } = require("../../../classes");

const ALGORITHM = "aes-256-ctr";
const SALT_ROUNDS = 10;

function login(code, preRunData) {
  //console.log(preRunData[4][preRunData[1]][code.details.username]);
  if (
    bcrypt.compareSync(
      code.details.password,
      preRunData[4][preRunData[1]][code.details.username][0]
    )
  ) {
    const configPath = path.join(__dirname, "../../", `config.json`);
    let config = require(configPath);
    config.login = [
      preRunData[1],
      preRunData[4][preRunData[1]][code.details.username][1],
    ];
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return new Success("Logged in!");
  } else {
    return new Error("Authentication Error", "Wrong Password");
  }
}

module.exports = login;
