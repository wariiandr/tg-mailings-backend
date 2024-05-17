import Group from "../schemes/Group.js";
import SessionService from "./SessionService.js";
import AdminService from "./AdminService.js";

import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import sessionService from "./SessionService.js";

class GroupService {
    async create(group) {
        const createdGroup = await Group.create(group);
        return createdGroup;
    }

    async getAll() {
        const groups = await Group.find().populate('admins');
        return groups;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID');
        }

        const group = await Group.findById(id).populate('admins');
        return group;
    }

    async update(group) {
        if (!group._id) {
            throw new Error('Поле _id не указано');
        }

        const updatedGroup = await Group.findByIdAndUpdate(group._id, group, { new: true }).populate('admins');
        return updatedGroup;
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID');
        }

        const group = await Group.findByIdAndDelete(id);
        return group;
    }

    async parseAdmins(groupId) {
        let group = await this.getOne(groupId);

        const session = await SessionService.getLastSession();

        const stringSession = new StringSession(session.sessionCode);

        const client = new TelegramClient(stringSession, +session.apiId, session.apiHash, {});

        await client.connect();

        const channel = `${group.link}`.replace('https://t.me/', '');

        const response = await client.invoke(
            new Api.channels.GetParticipants({
                channel,
                filter: new Api.ChannelParticipantsAdmins({}),
                offset: 0,
                limit: 100,
                hash: 0,
            })
        );

        for (let user of response.users) {
            if (user.username) {
                const createdAdmin = await AdminService.create({
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.username,
                });

                if (!group.admins.find(admin => admin.userName === user.username)) {
                    group.admins.push(createdAdmin._id);
                }
            }
        }

        group = await this.update(group);

        await client.disconnect();

        return group;
    }

    async startMailing(groupId, message) {
        let group = await this.getOne(groupId);

        const session = await SessionService.getLastSession();

        const stringSession = new StringSession(session.sessionCode);

        const client = new TelegramClient(stringSession, +session.apiId, session.apiHash, {});

        await client.connect();

        const promises = [];

        for (let admin of group.admins) {
            const promise = new Promise((resolve) => {
                setInterval(async () => {
                    const response = await client.invoke(
                        new Api.messages.SendMessage({
                            peer: admin.userName,
                            message,
                        })
                    );
                    resolve();
                }, 10000);
            });
            promises.push(promise);
        }

        await Promise.all(promises);

        await client.disconnect();
    }
}

export default new GroupService();