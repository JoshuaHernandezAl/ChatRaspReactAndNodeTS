const {lcdProcess,lcdProcessConnectionChild} = require('./child');

const lcdProcessMsg= (req,res)=>{    
    const {username,userType}=req.body;
    lcdProcess(username,userType);
    return res.json({
        ok:true,
        msg:'Comando ejecutado'
    })
}
const lcdProcessConnection= (req,res)=>{    
    const {username}=req.body;
    lcdProcessConnectionChild(username);
    return res.json({
        ok:true,
        msg:'Comando ejecutado',
    })
}

module.exports={
    lcdProcessMsg,
    lcdProcessConnection
}