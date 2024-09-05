const objects = {
  database: require(`${__dirname}\\database.js`),
  table: require(`${__dirname}\\table.js`),
  jsontable: require(`${__dirname}\\jsontable.js`),
};

function actionCreate(code, preRunData) {
  if (code.details.object === "database") {
    return objects.database(code, preRunData);
  } else if (code.details.object === "table") {
    return objects.table(code, preRunData);
  } else if (code.details.object === "jsontable") {
    return objects.jsontable(code, preRunData);
  }

  return code;
}

module.exports = actionCreate;
