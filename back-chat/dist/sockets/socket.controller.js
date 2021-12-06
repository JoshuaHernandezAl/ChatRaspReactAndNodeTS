"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const validate_jwt_1 = require("../middlewares/validate-jwt");
const Chat_1 = __importDefault(require("../models/Chat"));
const shortid_1 = __importDefault(require("shortid"));
const chatMessages = new Chat_1.default();
const socketController = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    const { xtoken, username } = socket.handshake.headers;
    const user = yield (0, validate_jwt_1.validateJWT)(String(xtoken), socket.id);
    if (user == socket.id) {
        eventsGuest(io, String(username), socket);
    }
    else if (!user) {
        return socket.disconnect();
    }
    else {
        eventsUserIdentified(io, user, socket);
    }
});
exports.socketController = socketController;
const eventsGuest = (io, username, socket) => {
    chatMessages.connectUser(username + (shortid_1.default.generate()));
    io.emit('active-users', chatMessages.usersArr);
    socket.emit('receive-msgs', chatMessages.last10);
    socket.on('disconnect', () => {
        chatMessages.desconnectUser(username);
        io.emit('active-users', chatMessages.usersArr);
    });
    socket.on('send-msg', ({ txtMessage: msg }) => {
        chatMessages.sendMessage(username, msg);
        io.emit('receive-msgs', chatMessages.last10);
        console.log('rojo');
    });
};
const eventsUserIdentified = (io, user, socket) => {
    chatMessages.connectUser(user);
    io.emit('active-users', chatMessages.usersArr);
    socket.emit('receive-msgs', chatMessages.last10);
    socket.on('disconnect', () => {
        chatMessages.desconnectUser(user);
        io.emit('active-users', chatMessages.usersArr);
    });
    socket.on('send-msg', ({ txtMessage: msg }) => {
        chatMessages.sendMessage(user, msg);
        io.emit('receive-msgs', chatMessages.last10);
        console.log('azul');
    });
};
//# sourceMappingURL=socket.controller.js.map