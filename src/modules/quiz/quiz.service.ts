import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from './entities/quiz.entity';
import { Model } from 'mongoose';
import { GetDto } from '../../common/dtos/get.dto';
import { GetResponseDto } from '../../common/dtos/response.dto';

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
            throw new BadRequestException();
        }
    }

    async findAll(query: GetDto): Promise<GetResponseDto<Quiz[]>> {
        try {
            const { search, sortBy, order, page = 1, limit = 10 } = query;
            const filters: any = {};
            const sortOptions = {};
            const skip = (page - 1) * limit;

            if (search) {
                filters.quizName = { $regex: search, $options: 'i' };
            }

            if (sortBy) {
                sortOptions[sortBy] = order === 'desc' ? -1 : 1;
            }

            const quizzes = await this.quizModel.find()
                .populate([
                    { path: "quizRecord", select: ["filePath", "fileName"] },
                    { path: "quizTopic" }
                ])
                .find(filters)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .exec();

            const totalItems = await this.quizModel.countDocuments(filters);

            return {
                data: quizzes,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            };
        } catch (error) {
            throw new BadRequestException();
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
            throw new BadRequestException();
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
            throw new BadRequestException();
        }
    }

    async remove(id: string): Promise<Quiz> {
        try {
            const quiz = await this.quizModel.findById(id);

            if (!quiz) throw new NotFoundException();

            const deletedQuiz = await this.quizModel.findByIdAndDelete({ _id: id });

            return deletedQuiz;
        } catch (error) {
            throw new BadRequestException();
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

    async findByTopic(topicName: string, query: GetDto): Promise<GetResponseDto<Quiz[]>> {
        try {
            const { search, sortBy, order, page = 1, limit = 10 } = query;
            const filters: any = {};
            const sortOptions = {};
            const skip = (page - 1) * limit;

            if (search) {
                filters.quizName = { $regex: search, $options: 'i' };
            }

            if (sortBy) {
                sortOptions[sortBy] = order === 'desc' ? -1 : 1;
            }

            const quizzes = await this.quizModel.find()
                .populate([
                    { path: "quizRecord", select: ["filePath", "fileName"] },
                    { path: "quizTopic" }
                ])
                .find(filters)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .exec();

            const quizzesByTopic = quizzes.filter(quiz => quiz.quizTopic.topicName.toLowerCase().split(" ").join("") === topicName.split("-").join(""))

            const totalItems = await this.quizModel.countDocuments(filters);

            return {
                data: quizzesByTopic,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            };
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
