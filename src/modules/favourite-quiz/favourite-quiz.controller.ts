import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FavouriteQuizService } from './favourite-quiz.service';
import { CreateFavouriteQuizDto } from './dto/create-favourite-quiz.dto';
import { Response, TransformInterceptor } from '../../interceptors/transform.interceptors';
import { AuthGuard } from '../auth/auth-guard';
import { FavouriteQuiz } from './entities/favourite-quiz.entity';

@Controller('favourite-quiz')
export class FavouriteQuizController {
    constructor(private readonly favouriteQuizService: FavouriteQuizService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createFavouriteQuizDto: CreateFavouriteQuizDto) {
        const newFav = await this.favouriteQuizService.create(createFavouriteQuizDto);

        if (!newFav) throw new BadRequestException();

        return {
            data: newFav,
            message: "Add favourite quiz success!"
        };
    }

    @Get(":userId/by-user")
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async findAll(@Param("userId") userId: string): Promise<Response<FavouriteQuiz[]>> {
        const quizzes = await this.favouriteQuizService.findAll(userId);

        if (!quizzes) throw new BadRequestException();

        return {
            data: quizzes,
            message: "Get all favourite quizzes success!"
        };
    }

    @Get(":quizId/by-quiz")
    @UseInterceptors(TransformInterceptor)
    async findByQuizId(@Param("quizId") quizId: string): Promise<Response<FavouriteQuiz>> {
        const quiz = await this.favouriteQuizService.findByQuizId(quizId);

        if (!quiz) {
            return {
                data: null,
                message: "Favourite quiz does not exist!"
            };
        }

        return {
            data: quiz,
            message: "Get favourite quiz success!"
        };
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async remove(@Param('id') id: string): Promise<Response<FavouriteQuiz>> {
        const deletedFav = await this.favouriteQuizService.remove(id);

        if (!deletedFav) throw new BadRequestException();

        return {
            data: deletedFav,
            message: "Remove favourite quiz success!"
        };
    }
}
