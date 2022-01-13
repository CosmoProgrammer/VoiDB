const wordCuller = require(`${__dirname}\\wordCuller.js`);
const ActionBodyClassesCreator = require(`${__dirname}\\ActionBodyClassesCreator.js`)
const ActionDetailsClassesCreator = require(`${__dirname}\\ActionDetailsClassesCreator.js`)

function mainLexer(code){
    let culledCode = wordCuller(code);
    let actionBodyCode = ActionBodyClassesCreator(culledCode);
    let actionDetailsCode = ActionDetailsClassesCreator(actionBodyCode);
    return `LEXED ${JSON.stringify(actionDetailsCode)}`;
}

module.exports = mainLexer;