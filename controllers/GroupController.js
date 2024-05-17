import GroupService from "../services/GroupService.js";

class GroupController {
    async create(req, res) {
        try {
            const group = await GroupService.create(req.body);
            res.json(group);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const groups = await GroupService.getAll();
            return res.json(groups);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;

            const group = await GroupService.getOne(id);
            res.json(group);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const group = req.body;

            const updatedGroup = await GroupService.update(group);
            return res.json(updatedGroup);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const group = await GroupService.delete(id);
            return res.json(group);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async parseAdmins(req, res) {
        try {
            const groupId = req.body.groupId;

            const updatedGroup = await GroupService.parseAdmins(groupId);
            return res.json(updatedGroup);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async startMailing(req, res) {
        try {
            const { groupId, message } = req.body;

            await GroupService.startMailing(groupId, message);
            return res.json('Рассылка успешно завершена');
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new GroupController();