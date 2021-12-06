import { Request, Response} from "express"
import User from "../models/User";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/jwt";

export const signup=async(req:Request,res:Response)=>{
    const {username,password}=req.body;
    try{
        const prevSign= await User.findOne({
            where: {
                username
            }
        });
        if(prevSign){
            return res.status(403).json({
                ok:false,
                msg:"Usuario ya registrado",

            });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user= User.build({
            username,
            password:hashPassword
        });
        await user.save();
        const token= await generarJWT(user.username);
        return res.status(200).json({
            ok:true,
            user,
            token,
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador",
        });
    }
}
export const login=async(req:Request,res:Response)=>{
    const {username,password}=req.body;
    try{
        const user= await User.findOne({
            where: {
                username
            }
        });
        if(!user){
            return res.status(403).json({
                ok:false,
                msg:"Credenciales incorrectas",

            });
        }
        if(!bcrypt.compareSync(password,user.password)){
            return res.status(403).json({
                ok:false,
                msg:"Credenciales incorrectas",
            });
        }
        const token= await generarJWT(user.username);
        return res.status(200).json({
            ok:true,
            user,
            token,
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador",
        });
    }
}


