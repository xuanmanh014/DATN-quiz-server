import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, BadRequestException, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';
import { Quiz } from './entities/quiz.entity';
import { AuthGuard } from '../../common/guards/auth.guard';
import { GetDto } from '../../common/dtos/get.dto';
import { GetResponseDto } from '../../common/dtos/response.dto';

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
    async findAll(@Query() query: GetDto): Promise<Response<GetResponseDto<Quiz[]>>> {
        const quizzes = await this.quizService.findAll(query);

        if (!quizzes) throw new BadRequestException();

        return {
            data: quizzes,
            message: "Get all quizzes success!"
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

    @Post(':id/answer-segment')
    async submitSegmentedAnswer(
        @Param('id') id: string,
        @Body() { segmentIndex, answer }: { segmentIndex: number; answer: string }
    ) {
        return await this.quizService.checkSegmentedAnswer(id, segmentIndex, answer);
    }

    @Post(':id/answer-full')
    async submitFullAnswer(@Param('id') id: string, @Body() { answer }: { answer: string }) {
        return await this.quizService.checkFullAudioAnswer(id, answer);
    }

    @Get("by-topic/:topic")
    async findAllByTopic(@Param('topic') topic: string, @Query() query: GetDto): Promise<Response<GetResponseDto<Quiz[]>>> {
        const quizzes = await this.quizService.findByTopic(topic, query);

        if (!quizzes) throw new BadRequestException();

        return {
            data: quizzes,
            message: "Get all quizzes success!"
        };
    }
}
