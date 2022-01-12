class Error {
    constructor(type, message){
        this.type = type;
        this.message = message;
    }
    display(){
        console.log(`${this.type}: ${this.message}`);
    }
}

module.exports = {
    Error: Error
}