import { Quiz } from "../../quiz/entities/quiz.entity";
import { User } from "../../user/entities/user.entity";

export class CreateFavouriteQuizDto {
    user: User;
    quiz: Quiz;
}
