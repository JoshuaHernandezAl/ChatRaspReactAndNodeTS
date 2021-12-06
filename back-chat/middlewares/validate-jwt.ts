import User from "../models/User";
const jwt= require('jsonwebtoken');


export const validateJWT=async(token:string,id:string)=>{
    try{
        //validacion de token
        if(token==='no-token'){
            return id;
        }
        const {username}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const user= await User.findOne({
            where: {
                username
            }
        });
        if(!user){
            return null
        }
        return user.username;
    }catch(err){
        console.log(err);
        return null
    }
    
}