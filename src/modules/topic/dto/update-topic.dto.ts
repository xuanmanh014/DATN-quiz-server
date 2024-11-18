import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDto } from './create-topic.dto';
import { Upload } from '../../upload/entities/upload.entity';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
    topicName?: string
    topicDescriptions?: string
    topicLevel?: string
    topicImage?: Upload
}
