import { getUser, signup, deleteUser, login } from '../controller/user.controller';
const {Router} = require('express');
const router=Router();

router.get('/getUser/:id',[],getUser);
router.post('/signup',[],signup);
router.delete('/deleteUser/:id',[],deleteUser);
router.post('/login',[],login);


export default router;