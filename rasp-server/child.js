const { exec } = require('child_process');
const lcdProcess=function(username='unknow',userType='guest'){
  exec(`python3 lcd.py ${username} ${userType}`, (error, stdout, stderr) => {
    try{
      if (error) {
        throw new Error(error.message);
      }
    
      if (stderr) {
        throw new Error(stderr);
      }
    }catch(err){
      console.log(err)
    }
  }); 
}

const lcdProcessConnectionChild=function(username='unknow'){
  exec(`python3 connect.py ${username}`, (error, stdout, stderr) => {
    try{
      if (error) {
        throw new Error(error.message);
      }
    
      if (stderr) {
        throw new Error(stderr);
      }
    }catch(err){
      console.log(err)
    }
  }); 
}

module.exports={
  lcdProcess,
  lcdProcessConnectionChild
}