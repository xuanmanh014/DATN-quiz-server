import { IsNotEmpty, IsString } from "class-validator"

export class CreateTopicDto {
    @IsString({ message: "Please provide valid value" })
    @IsNotEmpty({ message: "Please type topic's name" })
    topicName?: string
}
