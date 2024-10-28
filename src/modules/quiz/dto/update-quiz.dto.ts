import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { Upload } from '../../upload/entities/upload.entity';
import { Topic } from '../../topic/entities/topic.entity';
import { ISegment } from '../entities/quiz.entity';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
    quizName?: string
    quizScore?: number
    quizRecord?: Upload
    quizAnswer?: string
    quizType?: string
    quizTopic?: Topic
    segments?: ISegment[]
}
