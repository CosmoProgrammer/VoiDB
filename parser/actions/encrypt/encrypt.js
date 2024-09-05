const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const classes = require(path.join(__dirname, "../../../", "classes.js"));
const readTable = require(path.join(__dirname, "../select/table.js"));

const ALGORITHM = "aes-256-ctr";
const SALT_ROUNDS = 10;

function actionEncrypt(code, preRunData) {
  console.log(code);
  console.log(preRunData);
  const configPath = path.join(__dirname, "../../", `config.json`);
  let config = require(configPath);
  if (code.details.type === "table") {
    let storagePath = path.join(
      __dirname,
      "../../../",
      "storage",
      `${preRunData[1]}`,
      `${code.details.name}.json`
    );
    encryptTable(storagePath, code.details.password);
    config.encryptedTables.push([preRunData[1], code.details.name]);
    //console.log(config);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return new classes.Success("Table encrypted");
  } else if (code.details.type === "database") {
    let storagePath = path.join(
      __dirname,
      "../../../",
      "storage",
      `${code.details.name}`
    );
    console.log(storagePath);
    try {
      const files = fs.readdirSync(storagePath);
      files.forEach((file) => {
        const filePath = path.join(storagePath, file);
        if (path.extname(file) === ".json") {
          encryptTable(filePath, code.details.password);
          config.encryptedTables.push([
            code.details.name,
            path.parse(filePath).name,
          ]);
        }
      });

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    } catch (e) {
      return new classes.Error("Encryption Error", e);
    }
  }
}

function encryptTable(filePath, password) {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);
  const cipher = crypto.createCipher(ALGORITHM, password);
  let encryptedData = cipher.update(jsonData, "utf8", "hex");
  encryptedData += cipher.final("hex");
  const encryptedObject = {
    passwordHash,
    data: encryptedData,
  };
  fs.writeFileSync(filePath, JSON.stringify(encryptedObject), "utf-8");
  console.log("File encrypted successfully!");
}

module.exports = actionEncrypt;
