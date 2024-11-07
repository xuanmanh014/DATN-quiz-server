import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizCommentDto } from './dto/create-quiz-comment.dto';
import { UpdateQuizCommentDto } from './dto/update-quiz-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuizComment, QuizCommentDocument } from './entities/quiz-comment.entity';
import { Model } from 'mongoose';

@Injectable()
export class QuizCommentsService {

    constructor(
        @InjectModel(QuizComment.name)
        private _model: Model<QuizCommentDocument>
    ) { }

    async create(createQuizCommentDto: CreateQuizCommentDto): Promise<QuizComment> {
        const newComment = new this._model(createQuizCommentDto);

        await newComment.save();

        return newComment;
    }

    async findAllByQuiz(quizId: string): Promise<QuizComment[]> {
        const comments = await this._model.find({ quiz: quizId })
            .populate([
                { path: "author", select: ["firstName", "lastName", "email"] },
            ]);

        return comments;
    }

    async update(id: string, updateQuizCommentDto: UpdateQuizCommentDto): Promise<QuizComment> {
        const comment = await this._model.findById(id);

        if (!comment) throw new NotFoundException("Comment does not exist!");

        const updatedComment = await this._model.findByIdAndUpdate(
            id,
            updateQuizCommentDto,
            { new: true }
        );

        return updatedComment;
    }

    async remove(id: string): Promise<QuizComment> {
        const comment = await this._model.findById(id);

        if (!comment) throw new NotFoundException("Comment does not exist!");

        const deletedComment = await this._model.findByIdAndDelete({ _id: id });

        return deletedComment;
    }
}
