import { PartialType } from '@nestjs/mapped-types';
import { CreateLearnVideoDto } from './create-learn-video.dto';
import { Upload } from '../../upload/entities/upload.entity';
import { VideoSection } from '../entities/learn-video.entity';

export class UpdateLearnVideoDto extends PartialType(CreateLearnVideoDto) {
    video: Upload;
    videoSections: VideoSection[];
    name: string;
    speaker?: string;
    description?: string;
}
