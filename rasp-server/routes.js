const {Router}=require('express');
const {lcdProcessMsg, lcdProcessConnection}= require('./controllers');

const router=Router();

router.post('/lcd-display-msg',[],lcdProcessMsg);
router.post('/lcd-display-connection',[],lcdProcessConnection);

module.exports= router;