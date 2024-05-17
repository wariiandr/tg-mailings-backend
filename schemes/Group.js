import mongoose from "mongoose";

const Group = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String },
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }
    ],
})

export default mongoose.model('Group', Group);