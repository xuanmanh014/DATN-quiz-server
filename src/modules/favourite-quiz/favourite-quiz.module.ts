import { Module } from '@nestjs/common';
import { FavouriteQuizService } from './favourite-quiz.service';
import { FavouriteQuizController } from './favourite-quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavouriteQuiz, FavouriteQuizSchema } from './entities/favourite-quiz.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: FavouriteQuiz.name, schema: FavouriteQuizSchema }])],
    controllers: [FavouriteQuizController],
    providers: [FavouriteQuizService],
})
export class FavouriteQuizModule { }
