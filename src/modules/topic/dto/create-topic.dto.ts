import { IsNotEmpty, IsString } from "class-validator"
import { Upload } from "../../upload/entities/upload.entity"

export class CreateTopicDto {
    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type topic's name" })
    topicName?: string

    @IsString({ message: "Please provide valid value" })
    topicDescriptions?: string

    topicLevel?: string
    topicImage?: Upload
}
