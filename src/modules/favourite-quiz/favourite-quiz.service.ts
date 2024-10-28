import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavouriteQuizDto } from './dto/create-favourite-quiz.dto';
import { FavouriteQuiz, FavouriteQuizDocument } from './entities/favourite-quiz.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FavouriteQuizService {
    constructor(
        @InjectModel(FavouriteQuiz.name)
        private favouriteQuizModel: Model<FavouriteQuizDocument>
    ) { }

    async create(createFavouriteQuizDto: CreateFavouriteQuizDto): Promise<FavouriteQuiz> {
        try {
            const newFav = new this.favouriteQuizModel(createFavouriteQuizDto);

            await newFav.save();

            return newFav;
        } catch (error) {
            return null;
        }
    }

    async findAll(userId: string): Promise<FavouriteQuiz[]> {
        try {
            const favQuizzes = await this.favouriteQuizModel.find({ user: userId })
                .populate([
                    { path: "user" },
                    {
                        path: "quiz", populate: [
                            { path: "quizTopic" }
                        ]
                    }
                ]);

            return favQuizzes;
        } catch (error) {
            return null;
        }
    }

    async findByQuizId(quizId: string): Promise<FavouriteQuiz> {
        try {
            const favQuiz = await this.favouriteQuizModel.findOne({ quiz: quizId })
                .populate([
                    { path: "user" },
                    {
                        path: "quiz", populate: [
                            { path: "quizTopic" }
                        ]
                    }
                ]);

            return favQuiz;
        } catch (error) {
            return null;
        }
    }

    async remove(id: string): Promise<FavouriteQuiz> {
        try {
            const favQuiz = await this.favouriteQuizModel.findById(id);

            if (!favQuiz) throw new NotFoundException("Can not find favourite quiz!");

            await this.favouriteQuizModel.findByIdAndDelete({ _id: id });

            return favQuiz;
        } catch (error) {
            return null;
        }
    }
}
