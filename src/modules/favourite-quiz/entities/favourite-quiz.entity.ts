import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../user/entities/user.entity";
import { Quiz } from "../../quiz/entities/quiz.entity";

export type FavouriteQuizDocument = Document & FavouriteQuiz;

@Schema()
export class FavouriteQuiz {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Quiz.name })
    quiz: Quiz
}

export const FavouriteQuizSchema = SchemaFactory.createForClass(FavouriteQuiz);
