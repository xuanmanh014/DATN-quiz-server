import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, BadRequestException } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AuthGuard } from '../auth/auth-guard';
import { Response, TransformInterceptor } from '../../interceptors/transform.interceptors';
import { Quiz } from './entities/quiz.entity';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createQuizDto: CreateQuizDto): Promise<Response<Quiz>> {
        const newQuiz = await this.quizService.create(createQuizDto);

        if (!newQuiz) throw new BadRequestException();

        return {
            data: newQuiz,
            message: "Create new quiz success!"
        };
    }

    @Get()
    async findAll(): Promise<Response<Quiz[]>> {
        const quizs = await this.quizService.findAll();

        if (!quizs) throw new BadRequestException();

        return {
            data: quizs,
            message: "Get all quizs success!"
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Response<Quiz>> {
        const quiz = await this.quizService.findOne(id);

        if (!quiz) throw new BadRequestException();

        return {
            data: quiz,
            message: "Get quiz success!"
        };
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto): Promise<Response<Quiz>> {
        const updatedQuiz = await this.quizService.update(id, updateQuizDto);

        if (!updatedQuiz) throw new BadRequestException();

        return {
            data: updatedQuiz,
            message: "Update quiz success!"
        };
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async remove(@Param('id') id: string): Promise<Response<Quiz>> {
        const deletedQuiz = await this.quizService.remove(id);

        if (!deletedQuiz) throw new BadRequestException();

        return {
            data: deletedQuiz,
            message: "Delete quiz success!"
        };
    }
}
