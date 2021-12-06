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
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const socket_controller_1 = require("../sockets/socket.controller");
class Server {
    constructor() {
        this.paths = {
            users: "/api/users",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        //socket config
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        this.dbConnect();
        this.middlewares();
        this.routes();
        //socket events
        this.sockets();
    }
    routes() {
        this.app.use(this.paths.users, user_routes_1.default);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("db connected");
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura body
        this.app.use(express_1.default.json());
        //CarpetaPublica
        this.app.use(express_1.default.static('public'));
    }
    sockets() {
        this.io.on('connection', (socket) => (0, socket_controller_1.socketController)(socket, this.io));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Server on port ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map