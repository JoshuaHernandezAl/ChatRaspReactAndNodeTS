"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const { Router } = require('express');
const router = Router();
router.get('/getUser/:id', [], user_controller_1.getUser);
router.post('/signup', [], user_controller_1.signup);
router.delete('/deleteUser/:id', [], user_controller_1.deleteUser);
router.post('/login', [], user_controller_1.login);
exports.default = router;
//# sourceMappingURL=user.routes.js.map