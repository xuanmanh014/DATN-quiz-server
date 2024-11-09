import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../user/entities/user.entity";
import { Quiz } from "../../quiz/entities/quiz.entity";

export type QuizCommentDocument = Document & QuizComment

@Schema()
export class QuizComment {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Quiz.name })
    quiz: Quiz;

    @Prop({ type: Number, required: true })
    quizSegmentIndex: number;

    @Prop({ type: String, required: true })
    comment: string;

    @Prop({ type: Date, default: Date.now() })
    commentDate: Date;

    @Prop({ type: Date, default: Date.now() })
    updatedAt: Date;
}

export const QuizCommentSchema = SchemaFactory.createForClass(QuizComment);