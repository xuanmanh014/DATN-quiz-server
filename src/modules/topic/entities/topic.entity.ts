import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Upload } from "../../upload/entities/upload.entity";

export type TopicDocument = Document & Topic;

@Schema()
export class Topic {
    @Prop({ type: String, required: true })
    topicName?: string;

    @Prop({ type: String })
    topicDescriptions?: string;

    @Prop({ type: String })
    topicLevel?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Upload.name })
    topicImage?: Upload;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);