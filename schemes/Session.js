import mongoose from "mongoose";

const Session = new mongoose.Schema({
    apiId: { type: String, required: true },
    apiHash: { type: String, required: true },
    sessionCode: { type: String, required: true },
    phone: { type: String, required: true },
})

export default mongoose.model('Session', Session);