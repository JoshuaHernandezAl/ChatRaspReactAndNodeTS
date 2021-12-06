import { Request, Response} from "express"
import User from "../models/User";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/jwt";

export const getUser=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const user= await User.findByPk(id);
    if(!user){
        return res.status(403).json({
            ok:false,
            msg:"Usuario no registrado",

        });
    }
    res.json({
        ok:true,
        user,
    })
}
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
export const deleteUser=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const usuario=await User.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg:"No existe un usuario",
            });
        }

        await usuario.update({state:false});
        res.json({
            usuario,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'Error, comuniquese con el administrador',
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


