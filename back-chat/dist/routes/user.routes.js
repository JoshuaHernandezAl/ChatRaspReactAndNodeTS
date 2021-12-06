"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const { Router } = require('express');
const router = Router();
router.post('/signup', [], user_controller_1.signup);
router.post('/login', [], user_controller_1.login);
exports.default = router;
//# sourceMappingURL=user.routes.js.map