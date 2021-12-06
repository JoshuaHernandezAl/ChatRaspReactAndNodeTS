"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRETORPRIVATEKEY || "palabraSecreta";
const generarJWT = (username = '') => {
    return new Promise((resolve, reject) => {
        const payload = { username };
        jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generarJWT;
//# sourceMappingURL=jwt.js.map