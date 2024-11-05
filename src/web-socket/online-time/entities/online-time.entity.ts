import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../../modules/user/entities/user.entity';

export type SessionDocument = Document & Session;

@Schema()
export class Session {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    userId: User;

    @Prop({ type: Date, required: true })
    connectedAt: Date;

    @Prop({ type: Date })
    disconnectedAt?: Date;

    @Prop({ type: Number })
    duration?: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
