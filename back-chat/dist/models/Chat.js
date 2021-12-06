"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(username, message) {
        this.username = username;
        this.message = message;
    }
}
class ChatMessages {
    constructor() {
        this.msgs = [];
        this.users = {};
    }
    get last10() {
        this.msgs = this.msgs.splice(0, 10);
        return this.msgs;
    }
    get usersArr() {
        return Object.values(this.users);
    }
    sendMessage(username, message) {
        this.msgs.unshift(new Message(username, message));
    }
    connectUser(username) {
        this.users[username] = username;
    }
    desconnectUser(username) {
        delete this.users[username];
    }
}
exports.default = ChatMessages;
//# sourceMappingURL=Chat.js.map