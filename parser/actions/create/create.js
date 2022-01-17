const objects = {
    databases: require(`${__dirname}\\database.js`)
}

function actionCreate(code, preRunData){
    if(code.details.object === 'database'){
        return objects.databases(code, preRunData);
    }
    return code;
}

module.exports = actionCreate;