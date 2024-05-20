import {Router} from "express";
import AuthController from "./controllers/AuthController.js";
import GroupController from "./controllers/GroupController.js";
import AdminController from "./controllers/AdminController.js";
import SessionController from "./controllers/SessionController.js";

import AuthMiddleware from "./middlewares/AuthMiddleware.js";

import { check } from "express-validator";

const router = new Router();

router.post('/users/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], AuthController.registration);
router.post('/users/login', AuthController.login);

//router.post('/sessions/get_phone_code', SessionController.getPhoneCode);
router.post('/sessions', AuthMiddleware, SessionController.create);

router.get('/groups', AuthMiddleware, GroupController.getAll);
router.get('/groups/:id', AuthMiddleware, GroupController.getOne);
router.post('/groups', AuthMiddleware, GroupController.create);
router.post('/groups/parse_admins', AuthMiddleware, GroupController.parseAdmins);
router.post('/groups/start_mailing', AuthMiddleware, GroupController.startMailing);
router.put('/groups', AuthMiddleware, GroupController.update);
router.delete('/groups/:id', AuthMiddleware, GroupController.delete);

router.get('/admins', AuthMiddleware, AdminController.getAll);
router.get('/admins/:id', AuthMiddleware, AdminController.getOne);
router.post('/admins', AuthMiddleware, AdminController.create);
router.put('/admins', AuthMiddleware, AdminController.update);
router.delete('/admins/:id', AuthMiddleware, AdminController.delete);

export default router;