import SessionService from "../services/SessionService.js";

class SessionController {
    async create(req, res) {
        try {
            const session = await SessionService.create(req.body);
            res.json(session);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new SessionController();