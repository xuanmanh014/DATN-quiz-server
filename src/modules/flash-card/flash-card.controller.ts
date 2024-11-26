import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FlashCardService } from './flash-card.service';
import { CreateFlashCardDto } from './dto/create-flash-card.dto';
import { UpdateFlashCardDto } from './dto/update-flash-card.dto';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';
import { FlashCard } from './entities/flash-card.entity';

@Controller('flash-card')
export class FlashCardController {
    constructor(private readonly flashCardService: FlashCardService) { }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createFlashCardDto: CreateFlashCardDto): Promise<Response<FlashCard>> {
        const newCard = await this.flashCardService.create(createFlashCardDto);

        if (!newCard) throw new BadRequestException();

        return {
            data: newCard,
            message: "Create flash card success!"
        }
    }

    @Get()
    @UseInterceptors(TransformInterceptor)
    async findAll(): Promise<Response<FlashCard[]>> {
        const allCard = await this.flashCardService.findAll();

        return {
            data: allCard,
            message: "Get all flash card success!"
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flashCardService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(TransformInterceptor)
    async update(@Param('id') id: string, @Body() updateFlashCardDto: UpdateFlashCardDto): Promise<Response<FlashCard>> {
        const updatedCard = await this.flashCardService.update(id, updateFlashCardDto);

        if (!updatedCard) throw new BadRequestException();

        return {
            data: updatedCard,
            message: "Update flash card success!"
        }
    }

    @Delete(':id')
    @UseInterceptors(TransformInterceptor)
    async remove(@Param('id') id: string): Promise<Response<FlashCard>> {
        const deletedCard = await this.flashCardService.remove(id);

        if (!deletedCard) throw new BadRequestException();

        return {
            data: deletedCard,
            message: "Delete flash card success!"
        }
    }
}
