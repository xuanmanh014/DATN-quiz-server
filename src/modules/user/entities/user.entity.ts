import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ type: String })
    phoneNumber: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: ["user"], type: [String] })
    roles: string[];

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;

    @Prop({ type: Date })
    passwordUpatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);