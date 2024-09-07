const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const path = require("path");

class Error {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
  display() {
    console.log(`${this.type}: ${this.message}`);
  }
}

class Success {
  constructor(message) {
    this.message = message;
  }
  display() {
    console.log(this.message);
  }
}

class Data {
  constructor(data, info) {
    this.info = info;
    this.data = data;
  }
  display() {
    console.table(this.data);
  }
}

class ActionBody {
  constructor(action, body) {
    this.action = action;
    this.body = body;
    //console.log(`${this.action}: ${this.body}`);
  }
  display() {
    console.log(`${this.action}: ${this.body}`);
  }
}

class ActionDetails {
  constructor(action, details) {
    this.action = action;
    this.details = details;
    //console.log(`HII ${this.action}: ${JSON.stringify(this.details)}`);
  }
  display() {
    console.log(`${this.action}: ${this.details}`);
  }
}

class BodytoDetailsResolver {
  constructor(actionbody, ActionDetails) {
    this.action = actionbody.action;
    this.body = actionbody.body;
    this.ActionDetails = ActionDetails;
  }

  resolve() {
    let details = {};
    if (this.action === "select") {
      if (this.body[0] === "tables") {
        details.object = "tables";
        details.name = this.body[0];
      } else if (this.body[0] === "databases") {
        details.object = "databases";
      } else if (this.body[0] === "table") {
        details.object = "table";
        details.name = this.body[1];
        if (this.body[3] !== undefined) {
          details.columns = this.body[3];
        } else {
          details.columns = "*";
        }
        this.body.splice(0, 4);
        details.where = false;
        details.order = false;
        if (this.body.length !== 0) {
          if (this.body.length === 2) {
            if (this.body[0] === "where") {
              details.where = this.body[1];
            } else if (this.body[0] === "order") {
              details.order = this.body[1];
            }
          } else if (this.body.length === 4) {
            if (this.body[0] === "where") {
              details.where = this.body[1];
              if (this.body[2] === "order") {
                details.order = this.body[3];
              }
            } else if (this.body[0] === "order") {
              details.order = this.body[1];
              if (this.body[2] === "where") {
                details.where = this.body[3];
              }
            }
          }
        }
        if (this.body[this.body.length - 2] === "p") {
          details.password = this.body[this.body.length - 1];
        } else {
          details.password = false;
        }
      } else if (this.body[0] === "columns") {
        details.object = "columns";
        details.table = this.body[1];
      }
    } else if (this.action === "create") {
      //console.log(JSON.stringify(this.body));
      if (this.body[0] === "table" && this.body[1] !== "d") {
        details.object = "table";
        details.name = this.body[1];
        details.columns = this.body[3];
        details.values = this.body[5];
        details.defaultvals = false;
        this.body.splice(0, 6);
        if (this.body.length === 2) {
          details.defaultvals = this.body[1];
        }
      } else if (this.body[0] === "table" && this.body[1] === "d") {
        details.object = "jsontable";
        details.path = this.body[2];
      } else if (this.body[0] === "database") {
        details.object = "database";
        details.name = this.body[1];
      }
    } else if (this.action === "insert") {
      details.values = this.body[0];
      details.table = this.body[2];
      details.columns = this.body[4];
      if (this.body[this.body.length - 2] === "p") {
        details.password = this.body[this.body.length - 1];
      } else {
        details.password = false;
      }
    } else if (this.action === "delete") {
      if (this.body[0] === "database") {
        details.object = "database";
        details.database = this.body[1];
      } else if (this.body[0] === "table") {
        details.object = "table";
        details.table = this.body[1];
      } else if (this.body[0] === "storage") {
        details.object = "storage";
      }
    } else if (this.action === "truncate") {
      details.table = this.body[0];
      if (this.body[this.body.length - 2] === "p") {
        details.password = this.body[this.body.length - 1];
      } else {
        details.password = false;
      }
    } else if (this.action === "use") {
      details.database = this.body[0];
    } else if (this.action === "default") {
      if (this.body[this.body.length - 2] === "p") {
        details.password = this.body[this.body.length - 1];
      } else {
        details.password = false;
      }
      details.table = this.body[0];
    } else if (this.action === "validate") {
      details.usernameColumn = this.body[1];
      details.passwordColumn = this.body[4];
      details.username = this.body[2];
      details.password = this.body[5];
      details.table = this.body[7];
      if (this.body[this.body.length - 2] === "p") {
        details.tpassword = this.body[this.body.length - 1];
      } else {
        details.tpassword = false;
      }
    } else if (this.action === "encrypt") {
      details.object == this.body[0];
      details.type = this.body[0];
      details.name = this.body[1];
      details.password = this.body[2];
    }
    for (let x in details) {
      if (typeof details[x] !== "boolean") {
        details[x] = details[x].replace(/(^"|"$)/g, "");
      }
    }
    //console.log(details);
    return new ActionDetails(this.action, details);
  }

  display() {
    console.log("vvvvvvvv");
    console.log(this.action);
    console.table(this.body);
    console.log("^^^^^^^^");
  }
}

class Decrypter {
  constructor(database, table) {
    this.database = database;
    this.table = table;
  }
  check() {
    const configPath = path.join(__dirname, "parser", `config.json`);
    let config = require(configPath);
    let tableList = config.encryptedTables;
    //console.log(tableList);
    for (let table of tableList) {
      //console.log(this.database, this.table);
      if (table[0] == this.database && table[1] == this.table) {
        return true;
      }
    }
    return false;
  }
  decrypt(password) {
    const ALGORITHM = "aes-256-ctr";
    const filePath = path.join(
      __dirname,
      "storage",
      `${this.database}`,
      `${this.table}.json`
    );
    const encryptedObject = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    //console.log(password, encryptedObject.passwordHash);
    const passwordMatch = bcrypt.compareSync(
      password,
      encryptedObject.passwordHash
    );
    if (!passwordMatch) {
      console.error("Invalid password!");
      return new Error("Authentication Error", "Passwords don't match");
    }

    const decipher = crypto.createDecipher(ALGORITHM, password);

    let decryptedData = decipher.update(encryptedObject.data, "hex", "utf8");
    decryptedData += decipher.final("utf8");

    console.log("File decrypted successfully!");
    //console.log(JSON.parse(decryptedData));

    return decryptedData;
  }
}

module.exports = {
  Error: Error,
  Success: Success,
  ActionBody: ActionBody,
  BodytoDetailsResolver: BodytoDetailsResolver,
  ActionDetails: ActionDetails,
  Data: Data,
  Decrypter: Decrypter,
};
