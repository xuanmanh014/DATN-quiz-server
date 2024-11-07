import { Module } from '@nestjs/common';
import { QuizCommentsService } from './quiz-comments.service';
import { QuizCommentsController } from './quiz-comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizComment, QuizCommentSchema } from './entities/quiz-comment.entity';

@Module({
    imports: [MongooseModule.forFeature([{ schema: QuizCommentSchema, name: QuizComment.name }])],
    controllers: [QuizCommentsController],
    providers: [QuizCommentsService],
})
export class QuizCommentsModule { }
