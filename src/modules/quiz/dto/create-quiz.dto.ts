import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Upload } from "../../upload/entities/upload.entity"

export class CreateQuizDto {
    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type quiz's name" })
    quizName?: string

    @IsNumber({ allowNaN: false })
    @IsNotEmpty({ message: "Please type quiz's score" })
    quizScore?: number

    @IsNotEmpty({ message: "Please upload quiz's record" })
    quizRecord?: Upload

    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type quiz's answer" })
    quizAnswer?: string

    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type quiz's type" })
    quizType?: string
}
