const actions = {
    create: require(`${__dirname}\\actions\\create\\create.js`),
    use: require(`${__dirname}\\actions\\use\\use.js`)
}

function run(code, preRunData){
    if(code.action==="create"){
        return actions.create(code, preRunData)
    } else if(code.action==="use"){
        return actions.use(code, preRunData);
    }
    return code.action;
}

module.exports = run;