import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from './entities/quiz.entity';
import { Model } from 'mongoose';

@Injectable()
export class QuizService {
    constructor(
        @InjectModel(Quiz.name)
        private quizModel: Model<QuizDocument>
    ) { }

    async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
        try {
            const newQuiz = new this.quizModel(createQuizDto);

            if (createQuizDto.quizType === "listen") {
                newQuiz.quizRecord = createQuizDto.quizRecord;
            }

            await newQuiz.save();

            return newQuiz;
        } catch (error) {
            return null;
        }
    }

    async findAll(): Promise<Quiz[]> {
        try {
            const quizs = await this.quizModel.find()
                .populate([
                    { path: "quizRecord", select: ["filePath", "fileName"] },
                    { path: "quizTopic" }
                ]);

            return quizs;
        } catch (error) {
            return null;
        }
    }

    async findOne(id: string): Promise<Quiz> {
        try {
            const quiz = await this.quizModel.findById(id)
                .populate([
                    { path: "quizRecord", select: ["filePath", "fileName"] },
                    { path: "quizTopic" }
                ]);

            if (!quiz) throw new NotFoundException();

            return quiz;
        } catch (error) {
            return null;
        }
    }

    async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
        try {
            const quiz = await this.quizModel.findById(id);

            if (!quiz) throw new NotFoundException();

            const updatedQuiz = await this.quizModel.findByIdAndUpdate(
                id,
                updateQuizDto,
                { new: true }
            );

            return updatedQuiz;
        } catch (error) {
            return null;
        }
    }

    async remove(id: string): Promise<Quiz> {
        try {
            const quiz = await this.quizModel.findById(id);

            if (!quiz) throw new NotFoundException();

            const deletedQuiz = await this.quizModel.findByIdAndDelete({ _id: id });

            return deletedQuiz;
        } catch (error) {
            return null;
        }
    }

    async checkSegmentedAnswer(quizId: string, segmentIndex: number, userAnswer: string) {
        const quiz = await this.quizModel.findById(quizId);

        if (!quiz) throw new NotFoundException('Quiz not found');

        const segment = quiz.segments[segmentIndex];
        if (!segment) throw new NotFoundException('Segment not found');

        const isCorrect = segment.answer.toLowerCase() === userAnswer.toLowerCase();
        return { success: true, isCorrect };
    }

    async checkFullAudioAnswer(quizId: string, userAnswer: string) {
        const quiz = await this.quizModel.findById(quizId);

        if (!quiz) throw new NotFoundException('Quiz not found');

        const isCorrect = quiz.quizAnswer.toLowerCase() === userAnswer.toLowerCase();
        return { success: true, isCorrect };
    }
}
