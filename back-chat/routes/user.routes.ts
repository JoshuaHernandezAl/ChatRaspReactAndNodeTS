import {  signup, login } from '../controller/user.controller';
const {Router} = require('express');
const router=Router();

router.post('/signup',[],signup);
router.post('/login',[],login);


export default router;