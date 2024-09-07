const path = require("path");
const fs = require("fs");
const classes = require(path.join(__dirname, "../../../", "classes.js"));
const readTable = require(path.join(__dirname, "../select/table.js"));
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const ALGORITHM = "aes-256-ctr";
const SALT_ROUNDS = 10;

function actionInsert(code, preRunData) {
  try {
    //let password = bcrypt.compareSync(code.details.password, 10 );
    //console.log(new classes.ActionDetails('select', {object: 'table', name: code.details.table, columns: `['${code.details.usernameColumn}', '${code.details.passwordColumn}']`, where: `${code.details.usernameColumn} === '${code.details.username}''`, order: false}))
    let table = readTable(
      new classes.ActionDetails("select", {
        object: "table",
        name: code.details.table,
        columns: `['${code.details.usernameColumn}', '${code.details.passwordColumn}']`,
        where: `${code.details.usernameColumn} === '${code.details.username}'`,
        order: false,
        password: code.details.tpassword,
      }),
      preRunData
    ).data;
    if (table === undefined) {
      return new classes.Error("StorageError", "Columns or Table not found");
    }
    for (let x in table) {
      if (bcrypt.compareSync(code.details.password, table[x]["pword"])) {
        return new classes.Success(true);
      }
    }
    return new classes.Success(false);
  } catch (error) {
    return new classes.Error(
      `Validation Error`,
      "Something has gone wrong during validation"
    );
  }
}

module.exports = actionInsert;
