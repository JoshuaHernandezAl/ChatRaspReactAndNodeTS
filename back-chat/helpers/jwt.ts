import jwt from "jsonwebtoken";

const secretKey=process.env.SECRETORPRIVATEKEY||"palabraSecreta";
const generarJWT=(username='')=>{
    return new Promise((resolve,reject) =>{
        const payload={username};
        jwt.sign(payload,secretKey,{
            expiresIn:'24h',
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
            
        });

    });
}

export default generarJWT;