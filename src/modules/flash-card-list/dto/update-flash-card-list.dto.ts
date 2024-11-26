import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashCardListDto } from './create-flash-card-list.dto';

export class UpdateFlashCardListDto extends PartialType(CreateFlashCardListDto) {
    listName?: string;
    listDescription?: string;
}
