const path = require('path');
const fs = require('fs');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function actionUse(code, preRunData){
    const configPath = path.join(__dirname, '../../', `config.json`);
    let config = require(configPath);
    config.usingDatabase = code.details.database;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    if (preRunData[0]) return new classes.Success(`Using ${code.details.database}`)
}

module.exports = actionUse;