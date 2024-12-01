import { Injectable } from "@nestjs/common";
import { CreateLearnVideoDto } from "./dto/create-learn-video.dto";
import { LearnVideoDocument } from "./entities/learn-video.entity";

@Injectable()
export default class LearnVideoMapper {
    async mapFromDto(dto: CreateLearnVideoDto, document: LearnVideoDocument) {
        document.video = dto.video;
        document.videoSections = dto.videoSections;
        document.name = dto.name;
        document.speaker = dto.speaker;
        document.description = dto.description;
    }
}