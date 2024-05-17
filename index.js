import express from 'express';
import mongoose from 'mongoose';
import router from "./router.js";
import cors from "cors";

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:user@diplom.j1unj98.mongodb.net/?retryWrites=true&w=majority&appName=diplom';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);

        app.listen(PORT, () => {
            console.log(`SERVER STARTED ON PORT ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

await startApp();

