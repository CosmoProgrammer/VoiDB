const path = require("path");
const fs = require("fs");
const classes = require(path.join(__dirname, "../../../", "classes.js"));
const readColumns = require(path.join(__dirname, "../select/columns.js"));
const bcrypt = require("bcrypt");
class hashPassword {
  constructor(index) {
    this.index = index;
  }
}
const crypto = require("crypto");

const ALGORITHM = "aes-256-ctr";
const SALT_ROUNDS = 10;

function valueChecker(columns, values) {
  /*console.log('in valueChecker');
    console.log(columns);
    console.log(values);
    console.log('exitting column check')*/
  let exceptionTypes = ["password"];
  let needToHash = false;
  let index;
  if (columns.length !== values.length) {
    return new classes.Error(
      "TypeError",
      `Number of values: ${values.length} must be equal to number of columns: ${columns.length}`
    );
  }
  for (let x in values) {
    let expectedType = Object.values(columns[x])[0].split(" ")[0];
    let actualType = typeof values[x];
    if (!exceptionTypes.includes(expectedType)) {
      if (!(expectedType === actualType)) {
        return new classes.Error(
          "TypeError",
          `Values don't match with Types. Type of ${values[x]} is ${actualType} and not ${expectedType}`
        );
      }
    } else {
      if (expectedType === "password") {
        needToHash = true;
        index = x;
        if (actualType !== "string") {
          return new classes.Error(
            "TypeError",
            `Password has to be a sting. Type of ${values[x]} is ${actualType} and not String`
          );
        }
      }
    }
  }
  if (needToHash) return new hashPassword(index);
}

function actionInsert(code, preRunData) {
  try {
    let storagePath = path.join(
      __dirname,
      "../../../",
      "storage",
      `${preRunData[1]}`,
      `${code.details.table}.json`
    );
    let Decrypter = new classes.Decrypter(preRunData[1], code.details.table);
    //console.log(Decrypter.check());
    console.log(code);
    let table = null;
    if (!Decrypter.check()) {
      table = require(storagePath);
    } else {
      table = JSON.parse(Decrypter.decrypt(code.details.password));
    }
    if (code.details.columns === "*") {
      code.details.columns = "all";
    }
    let fullColumnData = readColumns(
      new classes.ActionDetails("select", {
        object: "columns",
        table: code.details.table,
        password: code.details.password,
      }),
      preRunData
    ).data;
    let actualColumns = fullColumnData[0];
    let columnParams = fullColumnData[1];
    if (code.details.columns === "all") {
      code.details.columns = actualColumns;
    } else {
      code.details.columns = code.columns.replace(/\'/g, '"');
      code.details.columns = JSON.parse(code.columns);
    }
    let values = JSON.parse(code.details.values.replace(/\'/g, '"'));
    for (let y in values) {
      let tempCheckerResult = valueChecker(columnParams, values[y]);
      if (tempCheckerResult instanceof classes.Error) {
        return tempCheckerResult;
      } else if (tempCheckerResult instanceof hashPassword) {
        let hash = bcrypt.hashSync(values[y][tempCheckerResult["index"]], 10);
        values[y][tempCheckerResult["index"]] = hash;
      }
    }
    //console.log(
    //  "()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()"
    //);
    if (table.values !== false) {
      for (let x in values) {
        table.values.push(values[x]);
      }
    } else {
      table.values = [];
      for (let x in values) {
        table.values.push(values[x]);
      }
    }
    try {
      let USING_DATABASE = preRunData[1];
      if (USING_DATABASE === "") {
        return "KeyError: Not using any database currently";
      }
      if (!Decrypter.check()) {
        fs.writeFileSync(storagePath, JSON.stringify(table, null, 4));
      } else {
        const passwordHash = bcrypt.hashSync(
          code.details.password,
          SALT_ROUNDS
        );
        const cipher = crypto.createCipher(ALGORITHM, code.details.password);
        let encryptedData = cipher.update(JSON.stringify(table), "utf8", "hex");
        encryptedData += cipher.final("hex");
        const encryptedObject = {
          passwordHash,
          data: encryptedData,
        };
        fs.writeFileSync(storagePath, JSON.stringify(encryptedObject), "utf-8");
      }
      if (preRunData[0])
        return new classes.Success(
          `Successfully inserted the values into the table ${table.name}`
        );
    } catch (e) {
      return new classes.Error(
        "StorageError",
        `Cannot find table ${code.details.table}`
      );
    }
  } catch (e) {
    console.error(e);
    return new classes.Error(
      "StorageError",
      `Cannot find table ${code.details.table}`
    );
  }
  //return new classes.Error("StorageError", `Cannot find table ${code.details.table}`);
}

module.exports = actionInsert;
