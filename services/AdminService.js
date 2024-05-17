import Admin from "../schemes/Admin.js";

class AdminService {
    async create(admin) {
        const createdAdmin = await Admin.create(admin);
        return createdAdmin;
    }

    async getAll() {
        const admins = await Admin.find();
        return admins;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID');
        }

        const admin = await Admin.findById(id);
        return admin;
    }

    async update(admin) {
        if (!admin._id) {
            throw new Error('Поле _id не указано');
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(admin._id, admin, { new: true });
        return updatedAdmin;
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID');
        }

        const admin = await Admin.findByIdAndDelete(id);
        return admin;
    }
}

export default new AdminService();