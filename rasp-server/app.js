const express=require('express');
const cors=require('cors');

const app=express();
const PORT=8080;
const paths={
    control:'/api/iot/'
};

app.use(cors());
app.use(express.json());
app.use(paths.control,require('./routes'));

app.listen(PORT,(re,res)=>{
    console.log("Servidor en puerto: ",PORT);
});
