import mongoose from "mongoose";

const Admin = new mongoose.Schema({
    userId: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true },
})

export default mongoose.model('Admin', Admin);