import { Upload } from "../../upload/entities/upload.entity"
import { VideoSection } from "../entities/learn-video.entity"

export class CreateLearnVideoDto {
    video: Upload;
    videoSections: VideoSection[];
    name: string;
    speaker?: string;
    description?: string;
}
