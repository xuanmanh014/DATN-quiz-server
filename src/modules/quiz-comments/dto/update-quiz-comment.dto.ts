import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizCommentDto } from './create-quiz-comment.dto';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';

export class UpdateQuizCommentDto extends PartialType(CreateQuizCommentDto) {
    author: User;
    quiz: Quiz;
    comment: string;
    commentDate: Date;
    updatedAt: Date;
}
