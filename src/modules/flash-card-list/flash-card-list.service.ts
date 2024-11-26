import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFlashCardListDto } from './dto/create-flash-card-list.dto';
import { UpdateFlashCardListDto } from './dto/update-flash-card-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlashCardList, FlashCardListDocument } from './entities/flash-card-list.entity';
import { Model } from 'mongoose';

@Injectable()
export class FlashCardListService {
    constructor(
        @InjectModel(FlashCardList.name)
        private _model: Model<FlashCardListDocument>
    ) { }

    async create(createFlashCardListDto: CreateFlashCardListDto): Promise<FlashCardList> {
        try {
            const newList = new this._model(createFlashCardListDto);

            await newList.save();

            return newList;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async findAll(): Promise<FlashCardList[]> {
        try {
            const allCardList = await this._model.find();

            return allCardList;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} flashCardList`;
    }

    update(id: number, updateFlashCardListDto: UpdateFlashCardListDto) {
        return `This action updates a #${id} flashCardList`;
    }

    remove(id: number) {
        return `This action removes a #${id} flashCardList`;
    }
}
