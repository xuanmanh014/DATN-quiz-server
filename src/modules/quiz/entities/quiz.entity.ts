import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Upload } from "../../upload/entities/upload.entity";
import { Topic } from "../../topic/entities/topic.entity";

export type QuizDocument = Document & Quiz;

@Schema()
export class Quiz {
    @Prop({ type: String, required: true })
    quizName?: string;

    @Prop({ type: Number, required: false, default: 0 })
    quizScore?: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Upload.name })
    quizRecord?: Upload;

    @Prop({ type: String, required: true })
    quizAnswer?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Topic.name })
    quizTopic?: Topic;

    @Prop({ type: String, required: true })
    quizType?: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);