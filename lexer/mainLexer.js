const wordCuller = require(`${__dirname}\\wordCuller.js`);

function mainLexer(code){
    let culledCode = wordCuller(code);
    return `LEXED ${culledCode}`;
}

module.exports = mainLexer;