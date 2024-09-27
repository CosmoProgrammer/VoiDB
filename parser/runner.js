const actions = {
  create: require(`${__dirname}\\actions\\create\\create.js`),
  use: require(`${__dirname}\\actions\\use\\use.js`),
  delete: require(`${__dirname}\\actions\\delete\\delete.js`),
  truncate: require(`${__dirname}\\actions\\truncate\\truncate.js`),
  default: require(`${__dirname}\\actions\\default\\default.js`),
  select: require(`${__dirname}\\actions\\select\\select.js`),
  insert: require(`${__dirname}\\actions\\insert\\insert.js`),
  validate: require(`${__dirname}\\actions\\validate\\validate.js`),
  encrypt: require(`${__dirname}\\actions\\encrypt\\encrypt.js`),
  login: require(`${__dirname}\\actions\\login\\login.js`),
  authorize: require(`${__dirname}\\actions\\authorize\\authorize.js`),
};

function run(code, preRunData) {
  if ((preRunData[3][1] = 0) && code.details.object !== "database") {
    if (code.action === "select") {
      return actions.select(code, preRunData);
    } else if (code.action === "use") {
      return actions.use(code, preRunData);
    } else if (code.action === "validate") {
      return actions.validate(code, preRunData);
    } else if (code.action === "login") {
      return actions.login(code, preRunData);
    } else {
      return new Error("Authentication Error", "Not Logged in");
    }
  } else if (code.action === "create") {
    return actions.create(code, preRunData);
  } else if (code.action === "use") {
    return actions.use(code, preRunData);
  } else if (code.action === "delete") {
    return actions.delete(code, preRunData);
  } else if (code.action === "truncate") {
    return actions.truncate(code, preRunData);
  } else if (code.action === "default") {
    return actions.default(code, preRunData);
  } else if (code.action === "select") {
    return actions.select(code, preRunData);
  } else if (code.action === "insert") {
    return actions.insert(code, preRunData);
  } else if (code.action === "validate") {
    return actions.validate(code, preRunData);
  } else if (code.action === "encrypt") {
    return actions.encrypt(code, preRunData);
  } else if (code.action === "login") {
    return actions.login(code, preRunData);
  } else if (code.action === "authorize") {
    return actions.authorize(code, preRunData);
  } else {
    return code.action;
  }
}

module.exports = run;
