const run = require(`${__dirname}\\runner.js`)
const preRunCheck = require(`${__dirname}\\preRunChecker.js`)

function mainParser(code){
    let preRunData = preRunCheck();
    let result = [];
    for(let x in code){
        let message = run(code[x], preRunData);
        result.push(message);
    }
    return result;
}

module.exports = mainParser;