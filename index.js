const mainLexer = require('./lexer/mainLexer.js');
const mainParser = require('./parser/mainParser.js');

function voidb(code){
    let lexedCode = mainLexer(code);
    let parsedCode = mainParser(lexedCode);
    return parsedCode;
};

module.exports = voidb;