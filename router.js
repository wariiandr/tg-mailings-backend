import {Router} from "express";
import GroupController from "./controllers/GroupController.js";
import AdminController from "./controllers/AdminController.js";
import SessionController from "./controllers/SessionController.js";

const router = new Router();

//router.post('/sessions/get_phone_code', SessionController.getPhoneCode);
router.post('/sessions', SessionController.create);

router.get('/groups', GroupController.getAll);
router.get('/groups/:id', GroupController.getOne);
router.post('/groups', GroupController.create);
router.post('/groups/parse_admins', GroupController.parseAdmins);
router.post('/groups/start_mailing', GroupController.startMailing);
router.put('/groups', GroupController.update);
router.delete('/groups/:id', GroupController.delete);

router.get('/admins', AdminController.getAll);
router.get('/admins/:id', AdminController.getOne);
router.post('/admins', AdminController.create);
router.put('/admins', AdminController.update);
router.delete('/admins/:id', AdminController.delete);

export default router;