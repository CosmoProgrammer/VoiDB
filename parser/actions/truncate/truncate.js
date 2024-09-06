const path = require("path");
const fs = require("fs");
const classes = require(path.join(__dirname, "../../../", "classes.js"));
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const ALGORITHM = "aes-256-ctr";
const SALT_ROUNDS = 10;

function actionTruncate(code, preRunData) {
  let storagePath = path.join(
    __dirname,
    "../../../",
    "storage",
    `${preRunData[1]}`,
    `${code.details.table}.json`
  );
  try {
    let Decrypter = new classes.Decrypter(preRunData[1], code.details.table);
    //console.log(Decrypter.check());
    console.log(code);
    let table = null;
    if (!Decrypter.check()) {
      table = require(storagePath);
    } else {
      table = JSON.parse(Decrypter.decrypt(code.details.password));
    }
    table.values = [];
    let USING_DATABASE = preRunData[1];
    if (USING_DATABASE === "") {
      return "KeyError: Not using any database currently";
    }
    if (!Decrypter.check()) {
      fs.writeFileSync(storagePath, JSON.stringify(table, null, 4));
    } else {
      const passwordHash = bcrypt.hashSync(code.details.password, SALT_ROUNDS);
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
        `Successfully truncated the table ${table.name}`
      );
  } catch (e) {
    console.log(e);
    return new classes.Error(
      "StorageError",
      `Cannot find table ${code.details.table}`
    );
  }
}

module.exports = actionTruncate;
