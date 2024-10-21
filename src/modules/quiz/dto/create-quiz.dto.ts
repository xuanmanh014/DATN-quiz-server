import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Upload } from "../../upload/entities/upload.entity"
import { Topic } from "../../topic/entities/topic.entity"
import { ISegment } from "../entities/quiz.entity"

export class CreateQuizDto {
    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type quiz's name" })
    quizName?: string

    @IsNumber({ allowNaN: false })
    @IsNotEmpty({ message: "Please type quiz's score" })
    quizScore?: number

    quizRecord?: Upload

    @IsNotEmpty({ message: "Please choose quiz's topic" })
    quizTopic?: Topic

    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type quiz's answer" })
    quizAnswer?: string

    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type quiz's type" })
    quizType?: string

    @IsBoolean({ message: "Please provide valid value" })
    isSegmented?: boolean;

    @IsNotEmpty({ message: "Please provide quiz's segments" })
    segments?: ISegment[];
}
