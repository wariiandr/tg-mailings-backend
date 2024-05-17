import AdminService from "../services/AdminService.js";

class AdminController {
    async create(req, res) {
        try {
            const admin = await AdminService.create(req.body);
            res.json(admin);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const admins = await AdminService.getAll();
            return res.json(admins);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;

            const admin = await AdminService.getOne(id);
            res.json(admin);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const admin = req.body;

            const updatedAdmin = await AdminService.update(admin);
            return res.json(updatedAdmin);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const admin = await AdminService.delete(id);
            return res.json(admin);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new AdminController();