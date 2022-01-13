class Error {
    constructor(type, message){
        this.type = type;
        this.message = message;
    }
    display(){
        console.log(`${this.type}: ${this.message}`);
    }
}

class ActionBody {
    constructor(action, body){
        this.action = action;
        this.body = body;
    }
    display(){
        console.log(`${this.action}: ${this.body}`);
    }
}

module.exports = {
    Error: Error,
    ActionBody: ActionBody
}