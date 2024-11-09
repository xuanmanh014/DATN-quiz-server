import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { Quiz } from "../../quiz/entities/quiz.entity";

export class CreateQuizCommentDto {
    @IsNotEmpty()
    author: User;

    @IsNotEmpty()
    quiz: Quiz;

    @IsNumber()
    @IsNotEmpty()
    quizSegmentIndex: number;

    @IsNotEmpty()
    comment: string;

    commentDate: Date;

    updatedAt: Date;
}
