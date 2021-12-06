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
exports.validateJWT = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt = require('jsonwebtoken');
const validateJWT = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validacion de token
        if (token === 'no-token') {
            return id;
        }
        const { username } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = yield User_1.default.findOne({
            where: {
                username
            }
        });
        if (!user) {
            return null;
        }
        return user.username;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map