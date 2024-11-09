import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, BadRequestException, BadGatewayException } from '@nestjs/common';
import { QuizCommentsService } from './quiz-comments.service';
import { CreateQuizCommentDto } from './dto/create-quiz-comment.dto';
import { UpdateQuizCommentDto } from './dto/update-quiz-comment.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';
import { QuizComment } from './entities/quiz-comment.entity';
import { GetQuizDto } from './dto/get-quiz-comment.dto';

@Controller('quiz-comments')
export class QuizCommentsController {
    constructor(private readonly quizCommentsService: QuizCommentsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createQuizCommentDto: CreateQuizCommentDto): Promise<Response<QuizComment>> {
        const newComment = await this.quizCommentsService.create(createQuizCommentDto);

        if (!newComment) throw new BadRequestException();

        return {
            data: newComment,
            message: "Create comment success!"
        }
    }

    @Post("/by-quiz-and-segment")
    async findAllByQuizAndSegmentIndex(@Body() params: GetQuizDto): Promise<Response<QuizComment[]>> {
        const comments = await this.quizCommentsService.findAllByQuizAndSegmentIndex(params);

        if (!comments) throw new BadGatewayException();

        return {
            data: comments,
            message: "Get all comment by quiz success!"
        }
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async update(@Param('id') id: string, @Body() updateQuizCommentDto: UpdateQuizCommentDto): Promise<Response<QuizComment>> {
        const updatedComment = await this.quizCommentsService.update(id, updateQuizCommentDto);

        if (!updatedComment) throw new BadRequestException();

        return {
            data: updatedComment,
            message: "Update comment success!"
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async remove(@Param('id') id: string): Promise<Response<QuizComment>> {
        const deletedComment = await this.quizCommentsService.remove(id);

        if (!deletedComment) throw new BadRequestException();

        return {
            data: deletedComment,
            message: "Delete comment success!"
        }
    }
}
