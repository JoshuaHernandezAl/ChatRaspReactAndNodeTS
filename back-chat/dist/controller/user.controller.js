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
exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const prevSign = yield User_1.default.findOne({
            where: {
                username
            }
        });
        if (prevSign) {
            return res.status(403).json({
                ok: false,
                msg: "Usuario ya registrado",
            });
        }
        const hashPassword = bcrypt_1.default.hashSync(password, 10);
        const user = User_1.default.build({
            username,
            password: hashPassword
        });
        yield user.save();
        const token = yield (0, jwt_1.default)(user.username);
        return res.status(200).json({
            ok: true,
            user,
            token,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({
            where: {
                username
            }
        });
        if (!user) {
            return res.status(403).json({
                ok: false,
                msg: "Credenciales incorrectas",
            });
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.status(403).json({
                ok: false,
                msg: "Credenciales incorrectas",
            });
        }
        const token = yield (0, jwt_1.default)(user.username);
        return res.status(200).json({
            ok: true,
            user,
            token,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
});
exports.login = login;
//# sourceMappingURL=user.controller.js.map