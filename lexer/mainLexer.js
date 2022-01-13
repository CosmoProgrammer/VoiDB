const wordCuller = require(`${__dirname}\\wordCuller.js`);
const ActionBodyClassesCreator = require(`${__dirname}\\ActionBodyClassesCreator.js`)

function mainLexer(code){
    let culledCode = wordCuller(code);
    let actionBodyCode = ActionBodyClassesCreator(culledCode);
    return `LEXED ${JSON.stringify(actionBodyCode)}`;
}

module.exports = mainLexer;