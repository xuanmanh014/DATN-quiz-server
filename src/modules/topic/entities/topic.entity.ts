import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TopicDocument = Document & Topic;

@Schema()
export class Topic {
    @Prop({ type: String, required: true })
    topicName?: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);