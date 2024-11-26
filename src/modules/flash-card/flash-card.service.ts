import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlashCardDto } from './dto/create-flash-card.dto';
import { UpdateFlashCardDto } from './dto/update-flash-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlashCard, FlashCardDocument } from './entities/flash-card.entity';
import { Model } from 'mongoose';

@Injectable()
export class FlashCardService {
    constructor(
        @InjectModel(FlashCard.name)
        private _model: Model<FlashCardDocument>
    ) { }

    async create(createFlashCardDto: CreateFlashCardDto): Promise<FlashCard> {
        try {
            const newCard = new this._model(createFlashCardDto);

            await newCard.save();

            return newCard;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async findAll(): Promise<FlashCard[]> {
        try {
            const allCards = await this._model.find()
                .populate([
                    { path: "cardList" }
                ]);

            return allCards;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    findOne(id: string) {
        return `This action returns a #${id} flashCard`;
    }

    async update(id: string, updateFlashCardDto: UpdateFlashCardDto): Promise<FlashCard> {
        const card = await this._model.findById(id);

        if (!card) throw new NotFoundException();

        const updatedCard = await this._model.findByIdAndUpdate(
            id,
            updateFlashCardDto,
            { new: true }
        );

        return updatedCard;
    }

    async remove(id: string): Promise<FlashCard> {
        const card = await this._model.findById(id);

        if (!card) throw new NotFoundException();

        const deletedCard = await this._model.findByIdAndDelete({ _id: id });

        return deletedCard;
    }
}
