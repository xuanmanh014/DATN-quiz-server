import { Module } from '@nestjs/common';
import { FlashCardService } from './flash-card.service';
import { FlashCardController } from './flash-card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashCard, FlashCardSchema } from './entities/flash-card.entity';

@Module({
    imports: [MongooseModule.forFeature([{ schema: FlashCardSchema, name: FlashCard.name }])],
    controllers: [FlashCardController],
    providers: [FlashCardService],
})
export class FlashCardModule { }
