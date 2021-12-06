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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token'); //el argumento es el nombre de como se debe de enviar desde el front
    //validacion de token
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }
    // try{
    //     let {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);//verifica que el JWT sea un JWT valido firmado por mi backend, y regresa todo el payload del token
    //     const userAuth=await User.findById(uid).populate('vacancies');
    //     if(!userAuth){
    //         return res.status(401).json({
    //             msg:'El usuario no existe',
    //         });
    //     }
    //     //verificar si el uid tiene estado en true
    //     if(!userAuth.state){
    //         return res.status(401).json({
    //             msg:'Token no válido',
    //         });
    //     }
    //     uid=userAuth._id;
    //     const {role,state,google,premium,name,email,vacancies,image,ssRequest}=userAuth;
    //     const userAuthR={
    //         role,
    //         state,
    //         google,
    //         premium,
    //         name,
    //         email,
    //         uid,
    //         vacancies,
    //         image,
    //         ssRequest,
    //     }
    //     req.userAuth=userAuthR;
    //     next();
    // }catch(err){
    //     console.log(err);
    //     res.status(401).json({
    //         msg:'Token no válido',
    //     });
    // }
});
exports.validateJWT = validateJWT;
module.exports = {
    validateJWT: exports.validateJWT,
};
//# sourceMappingURL=validate-jwt.js.map