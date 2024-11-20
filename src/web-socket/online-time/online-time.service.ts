import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './entities/online-time.entity';

@Injectable()
export class OnlineTimeService {
    constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) { }

    async userConnected(userId: string): Promise<void> {
        const existItem = await this.sessionModel.findOne({ userId });

        if (existItem) {
            existItem.connectedAt = new Date();
            await existItem.save();
        } else {
            const newSession = new this.sessionModel({
                userId,
                connectedAt: new Date(),
            });
            await newSession.save();
        }
    }

    async userDisconnected(userId: string): Promise<void> {
        const lastSession = await this.sessionModel
            .findOne({ userId });

        if (lastSession) {
            const now = new Date();
            const oldDuration = lastSession.duration || 0;
            lastSession.disconnectedAt = now;
            lastSession.duration = now.getTime() - lastSession.connectedAt.getTime() + oldDuration;
            await lastSession.save();
        }
    }

    async getTotalOnlineTimeOfDay(userId: string): Promise<number> {
        const session = await this.sessionModel.findOne({ userId });
        let onlineTime = 0;
        const now = new Date();

        if (session) {
            onlineTime = now.getTime() - session.connectedAt.getTime()
        }

        return onlineTime || 0;
    }

    async getTotalOnlineTime(userId: string): Promise<number> {
        const session = await this.sessionModel.findOne({ userId });
        return session.duration || 0;
    }

    async getAllOnlineUser(): Promise<Session[]> {
        const sessions = await this.sessionModel.find()
            .populate([
                { path: "userId", select: ["email", "firstName", "lastName"] }
            ]);
        return sessions;
    }
}
