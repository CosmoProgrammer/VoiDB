const fs = require("fs");
const path = require("path");
const classes = require(path.join(__dirname, "../../../", "classes.js"));

function selectColumns(code, preRunData) {
  let storagePath = path.join(
    __dirname,
    "../../../",
    "storage",
    `${preRunData[1]}`,
    `${code.details.table}.json`
  );
  try {
    let table = null;
    //console.log("Before the checking for decryption");
    //console.log(preRunData[1], code.details);
    let Decrypter = new classes.Decrypter(preRunData[1], code.details.table);
    if (!Decrypter.check()) {
      table = require(storagePath);
    } else {
      table = JSON.parse(Decrypter.decrypt(code.details.password));
    }
    //console.log("Before final return");
    //console.log(table);
    const columns = table.columns;
    let columnArray = [];
    for (let i in columns) {
      columnArray.push(Object.keys(columns[i]));
    }
    let finalArray = [].concat.apply([], columnArray);

    return new classes.Data(
      [finalArray, columns],
      `List of All Columns in Table ${code.details.table} in Database ${preRunData[1]}`
    );
  } catch (e) {
    if (e.code === "ENOENT") {
      return new classes.Error(
        "StorageError",
        `Table ${code.details.table} cannot be found in database ${preRunData[1]}.`
      );
    }
  }
}

module.exports = selectColumns;
