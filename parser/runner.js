const actions = {
    create: require(`${__dirname}\\actions\\create\\create.js`),
    use: require(`${__dirname}\\actions\\use\\use.js`),
    delete: require(`${__dirname}\\actions\\delete\\delete.js`),
    truncate: require(`${__dirname}\\actions\\truncate\\truncate.js`)
}

function run(code, preRunData){
    if(code.action==="create"){
        return actions.create(code, preRunData)
    } else if(code.action==="use"){
        return actions.use(code, preRunData);
    } else if(code.action==="delete"){
        return actions.delete(code, preRunData);
    } else if(code.action==='truncate'){
        return actions.truncate(code, preRunData);
    }
    return code.action;
}

module.exports = run;