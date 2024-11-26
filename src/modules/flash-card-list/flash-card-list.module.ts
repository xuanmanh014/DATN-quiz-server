import { Module } from '@nestjs/common';
import { FlashCardListService } from './flash-card-list.service';
import { FlashCardListController } from './flash-card-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashCardList, FlashCardListSchema } from './entities/flash-card-list.entity';

@Module({
    imports: [MongooseModule.forFeature([{ schema: FlashCardListSchema, name: FlashCardList.name }])],
    controllers: [FlashCardListController],
    providers: [FlashCardListService],
})
export class FlashCardListModule { }
