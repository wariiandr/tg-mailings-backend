import Session from '../schemes/Session.js';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "readline";

class SessionService {
    async create(payload) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const stringSession = new StringSession("");
        const client = new TelegramClient(stringSession, payload.apiId, payload.apiHash, {
            connectionRetries: 5,
        });

        await client.start({
            phoneNumber: payload.phone,
            password: async () =>
                new Promise((resolve) =>
                    rl.question("Please enter your password: ", resolve)
                ),
            phoneCode: async () =>
                new Promise((resolve) =>
                    rl.question("Please enter the code you received: ", resolve)
                ),
            onError: (err) => console.log(err),
        });

        const session = client.session.save();

        await client.disconnect()

        const createdSession = await Session.create({
            apiId: payload.apiId,
            apiHash: payload.apiHash,
            sessionCode: session,
            phone: payload.phone,
        });

        return createdSession;
    }

    async getLastSession() {
        const allSessions = await Session.find();
        return allSessions[allSessions.length - 1];
    }
}

export default new SessionService();