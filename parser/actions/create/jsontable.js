const fs = require("fs");
const path = require("path");
const classes = require(path.join(__dirname, "../../../", "classes.js"));

function createJSONTable(code, preRunData) {
  //console.log("here", code);
  fileName = path.basename(code.details.path);
  let USING_DATABASE = preRunData[1];
  if (USING_DATABASE === "") {
    return "KeyError: Not using any database currently";
  }
  let storagePath = path.join(
    __dirname,
    "../../../",
    "storage",
    `${USING_DATABASE}`,
    fileName
  );
  const jsonData = JSON.parse(fs.readFileSync(code.details.path, "utf-8"));
  if (
    !(
      jsonData.hasOwnProperty("name") &&
      jsonData.hasOwnProperty("columns") &&
      jsonData.hasOwnProperty("values") &&
      jsonData.hasOwnProperty("defaultvalues")
    )
  ) {
    console.log("Here");
    return new classes.Error("FileError", "File is not formatted correctly");
  }
  try {
    fs.copyFileSync(code.details.path, storagePath);
    return new classes.Success("Copied Table Successfully");
  } catch (e) {
    return new classes.Error("FileError", "FIle Was not Copied");
  }
}

module.exports = createJSONTable;
